import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import styles from './RegisterForm.module.css'

const RegisterForm = ({ onSwitchToLogin }) => {
  const { signUp } = useAuth()
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
    setError('')
  }

  const handleSubmit = async e => {
    e.preventDefault()

    // Валидация
    if (!form.email.includes('@')) {
      setError('Введите корректный email')
      return
    }

    if (form.password.length < 6) {
      setError('Пароль должен быть минимум 6 символов')
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('Пароли не совпадают')
      return
    }

    setError('')
    setLoading(true)

    const { error } = await signUp(form.email, form.password)

    if (error) {
      setError(error.message)
    } else {
      setSuccess('Регистрация успешна! Теперь войдите.')
      setForm({ email: '', password: '', confirmPassword: '' })
      setTimeout(() => onSwitchToLogin(), 2000)
    }

    setLoading(false)
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Регистрация</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <input
            type="password"
            name="password"
            placeholder="Пароль (минимум 6 символов)"
            value={form.password}
            onChange={handleChange}
            className={styles.input}
            required
            minLength={6}
          />
        </div>

        <div className={styles.formGroup}>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Подтвердите пароль"
            value={form.confirmPassword}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>

        <div className={styles.switch}>
          Уже есть аккаунт?{' '}
          <button type="button" onClick={onSwitchToLogin} className={styles.link}>
            Войти
          </button>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm
