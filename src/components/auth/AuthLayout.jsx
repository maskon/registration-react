// src/components/auth/AuthLayout.jsx - ОБНОВЛЕННЫЙ
import React from 'react'
import styles from './AuthLayout.module.css'

const AuthLayout = ({ children, isLogin }) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>🛒 Моё Приложение</h1>
          <p className={styles.subtitle}>
            {React.Children.toArray(children)[0]?.type?.name === 'UserDashboard'
              ? 'Личный кабинет'
              : isLogin
                ? 'Вход в систему'
                : 'Регистрация'}
          </p>
        </div>

        <div className={styles.content}>{children}</div>
      </div>
    </div>
  )
}

export default AuthLayout
