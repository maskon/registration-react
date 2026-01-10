import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import AuthLayout from './auth/AuthLayout'
import LoginForm from './auth/LoginForm'
import RegisterForm from './auth/RegisterForm'
import { UserDashboard } from './UserDashboard'

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

export default AuthApp
