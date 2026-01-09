import React, { useState } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import LoginForm from './components/auth/LoginForm'
import RegisterForm from './components/auth/RegisterForm'
import AuthLayout from './components/auth/AuthLayout'
import './App.css'

// Компонент для авторизованного пользователя
const UserDashboard = ({ user, signOut }) => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>👋 Добро пожаловать!</h1>
        <p>Вы успешно авторизованы в системе</p>
      </div>

      <div className="dashboard-content">
        <div className="user-card">
          <div className="user-info">
            <div className="info-item">
              <span className="label">📧 Email:</span>
              <span className="value">{user.email}</span>
            </div>
            <div className="info-item">
              <span className="label">🆔 ID пользователя:</span>
              <span className="value">{user.id.substring(0, 8)}...</span>
            </div>
            <div className="info-item">
              <span className="label">📅 Дата регистрации:</span>
              <span className="value">
                {new Date(user.created_at).toLocaleDateString('ru-RU', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>

          <div className="user-actions">
            <button onClick={signOut} className="action-btn logout-btn">
              🚪 Выйти из аккаунта
            </button>
          </div>
        </div>

        <div className="debug-info">
          <h3>✅ Статус системы:</h3>
          <p>Авторизация: Активна</p>
          <p>Сессия: Валидна</p>
          <p>Токен: Обновляется автоматически</p>
        </div>
      </div>
    </div>
  )
}

// Главный компонент с логикой переключения
const AuthApp = () => {
  const { user, loading, signOut } = useAuth()
  const [isLogin, setIsLogin] = useState(true)

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Загрузка...</p>
      </div>
    )
  }

  return (
    <AuthLayout isLogin={isLogin}>
      {user ? (
        <UserDashboard user={user} signOut={signOut} />
      ) : (
        <>
          {isLogin ? (
            <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
          )}
        </>
      )}
    </AuthLayout>
  )
}

// Основной App компонент
function App() {
  return (
    <AuthProvider>
      <AuthApp />
    </AuthProvider>
  )
}

export default App
