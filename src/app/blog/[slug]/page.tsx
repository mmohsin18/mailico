// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/blogs'

type PageProps = {
  params: { slug: string }
}

export const dynamic = 'force-static'

export function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="mx-32 px-4 py-12">
      <article className="prose prose-slate max-w-none dark:prose-invert">
        <header className="mb-6">
          <h1 className="mb-2 text-3xl font-semibold tracking-tight">
            {post.title}
          </h1>
          {post.date && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {new Date(post.date).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: '2-digit'
              })}
            </p>
          )}
        </header>

        {/* simple content rendering from txt */}
        {post.content.split('\n').map((line, i) =>
          line.trim() === '' ? (
            <p key={i} className="h-2" />
          ) : (
            <p key={i}>{line}</p>
          )
        )}
      </article>
    </main>
  )
}
