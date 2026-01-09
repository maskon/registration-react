import { createClient } from '@supabase/supabase-js'

// КЛЮЧИ!
const supabaseUrl = 'https://ajksipqeluaoytekjvpl.supabase.co'
const supabaseKey = 'sb_publishable_jBQDqgmDrRe3fzA4nUH1xw_1MW6SeAZ'

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true, // важно для OAuth
    flowType: 'pkce', // Более безопасный flow для SPA
    storage: {
      // Безопасное хранилище с обработкой ошибок
      getItem: key => {
        try {
          return localStorage.getItem(key)
        } catch {
          return null
        }
      },
      setItem: (key, value) => {
        try {
          localStorage.setItem(key, value)
        } catch {
          console.warn('LocalStorage недоступен')
        }
      },
      removeItem: key => {
        try {
          localStorage.removeItem(key)
        } catch {
          console.warn('LocalStorage недоступен')
        }
      },
    },
  },
})
