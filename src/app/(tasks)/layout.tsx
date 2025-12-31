import { createSupabaseServerClient } from '@/lib/supabase/server'
import { ReactNode } from 'react'
import TasksLayoutClient from './tasks-layout-client'
import { fetchUser } from 'data/fetchUser'

export default async function TasksLayout({
  children
}: {
  children: ReactNode
}) {
  const userData = await fetchUser();

  return <TasksLayoutClient user={userData}>{children}</TasksLayoutClient>
}
