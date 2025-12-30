import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import ProfileClient from '@/components/profile-client'


export default async function ProfilePage() {
  const supabase = createSupabaseServerClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) redirect('/auth?next=/profile')

  return <ProfileClient />
}
