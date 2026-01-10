import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import styles from './LoginForm.module.css'

const LoginForm = ({ onSwitchToRegister }) => {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await signIn(email, password)

    if (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Вход в систему</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <input
            type="email"
            placeholder="Ваш email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={styles.input}
            required
            autoComplete="email"
          />
        </div>

        <div className={styles.formGroup}>
          <input
            type="password"
            placeholder="Ваш пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={styles.input}
            required
            autoComplete="current-password"
          />
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Вход...' : 'Войти'}
        </button>

        <div className={styles.switch}>
          Нет аккаунта?{' '}
          <button type="button" onClick={onSwitchToRegister} className={styles.link}>
            Зарегистрироваться
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
