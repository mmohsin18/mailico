import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function fetchUser() {
  const supabase = createSupabaseServerClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  let userData = {
    name: 'Guest',
    email: 'guest@example.com',
    avatar: '',
    domain: 'example.com',
    plan_name: 'free'
  }

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()




    userData = {
      name: profile?.full_name || user.user_metadata?.name || user.email || '',
      email: user.email || '',
      avatar: profile?.avatar || user.user_metadata?.avatar_url || '',
      domain: profile?.domain || 'example.com',
      plan_name: profile?.plan_name || 'free'
    }

    return userData
  }
}
