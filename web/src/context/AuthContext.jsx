import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Hard fallback: if nothing resolves within 5s, stop loading
    const fallback = setTimeout(() => setLoading(false), 5000)

    // getSession() reads localStorage directly (no lock) — fast on reload
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        clearTimeout(fallback)
        setUser(session?.user ?? null)
        if (session?.user) fetchProfile(session.user.id)
        else setLoading(false)
      })
      .catch(() => {
        clearTimeout(fallback)
        setLoading(false)
      })

    // onAuthStateChange handles sign in / sign out / token refresh AFTER initial load
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'INITIAL_SESSION') return  // already handled by getSession() above
        setUser(session?.user ?? null)
        if (session?.user) {
          await fetchProfile(session.user.id)
        } else {
          setProfile(null)
          setLoading(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  async function fetchProfile(userId) {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      setProfile(data ?? null)
    } catch {
      setProfile(null)
    } finally {
      setLoading(false)
    }
  }

  async function signUp({ email, password, full_name, age, gender, location }) {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error

    // Insert profile row immediately after account creation
    if (data.user) {
      const { error: profileErr } = await supabase.from('profiles').insert({
        id: data.user.id,
        full_name,
        age: parseInt(age),
        gender,
        location,
      })
      if (profileErr) throw profileErr
      // Re-fetch profile — onAuthStateChange fires before the INSERT above completes,
      // so we need to explicitly load it after insertion
      await fetchProfile(data.user.id)
    }
    return data
  }

  async function signIn({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  }

  async function signOut() {
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider
      value={{ user, profile, loading, signUp, signIn, signOut, fetchProfile }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
