import { AuthProvider } from './contexts/AuthContext'
import { AuthApp } from './components/AuthApp'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <AuthApp />
    </AuthProvider>
  )
}

export default App
