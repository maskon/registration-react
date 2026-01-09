import React, { createContext, useState, useEffect, useContext } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Получаем текущую сессию
        const {
          data: { session: currentSession },
          error,
        } = await supabase.auth.getSession()

        setSession(currentSession)
        setUser(currentSession?.user ?? null)
      } catch (err) {
        console.error('❌ Ошибка при получении сессии:', err)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()

    // Слушаем изменения авторизации
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      setSession(newSession)
      setUser(newSession?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Отправляем пользователя сразу на страницу входа после регистрации
        emailRedirectTo: window.location.origin,
      },
    })

    return { data, error }
  }

  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      return { data, error }
    } catch (err) {
      console.error('❌ Неожиданная ошибка при входе:', err)
      return { data: null, error: err }
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        session,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
