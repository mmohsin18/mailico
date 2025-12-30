import { supabase } from '@/lib/supabase/client'

export async function signUp(name: string, email: string, password: string) {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name } // stored in raw_user_meta_data
    }
  })
  if (error) throw error
}

export async function signIn(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function fetchMe() {
  const { data: authData, error: authErr } = await supabase.auth.getUser()
  if (authErr) throw authErr

  const user = authData.user
  if (!user) return { user: null }

  // pull profile + sender identities
  const { data: profile, error: pErr } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (pErr) throw pErr

  const { data: senders, error: sErr } = await supabase
    .from('sender_identities')
    .select('*')
    .eq('user_id', user.id)
    .order('id', { ascending: true })

  if (sErr) throw sErr

  return {
    user: {
      id: user.id,
      email: user.email,
      ...profile,
      default_email: senders
    }
  }
}
