import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import ProfileEditClient from '@/components/profile-edit'

export default async function EditProfilePage() {
  const supabase = createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth?next=/profile/edit')

  return <ProfileEditClient />
}
