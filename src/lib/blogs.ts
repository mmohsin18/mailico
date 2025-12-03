import fs from 'fs'
import path from 'path'

export type BlogPost = {
  title: string
  slug: string
  date: string
  excerpt: string
  content: string
}

const BLOG_FILE_PATH = path.join(process.cwd(), 'content', 'blogs.txt')

function parseBlogsFile(): BlogPost[] {
  const raw = fs.readFileSync(BLOG_FILE_PATH, 'utf8')

  return raw
    .split('===') // split posts
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const [metaPart, ...contentParts] = block.split('---')
      const metaLines = metaPart
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean)

      const meta: Record<string, string> = {}
      for (const line of metaLines) {
        const [key, ...rest] = line.split(':')
        if (!key || rest.length === 0) continue
        meta[key.trim().toLowerCase()] = rest.join(':').trim()
      }

      const content = contentParts.join('---').trim()

      if (!meta.title || !meta.slug) {
        throw new Error(`Invalid blog block, missing title or slug:\n${block}`)
      }

      return {
        title: meta.title,
        slug: meta.slug,
        date: meta.date ?? '',
        excerpt: meta.excerpt ?? '',
        content
      } satisfies BlogPost
    })
}

export function getAllPosts(): BlogPost[] {
  const posts = parseBlogsFile()

  // Sort newest first (by date string)
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug)
}
