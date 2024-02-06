import './App.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthenCheck } from './components/AuthenCheck'
import NavLoggedIn from './components/NavHome'

function App() {
  const navigate = useNavigate()
  
  try {
    useEffect(() => {
      const authentication = async () => {
        const isAuthen = await AuthenCheck()
        if (!isAuthen) {
          navigate('/home')
        }
      }
      authentication()
    }, [])

  } catch (error) {
    console.error(error)
  }

  return (
    <div className="App">
      <NavLoggedIn />
      <div className="container-fluid text-center my-5">
        <h1>You are logged in!</h1>
      </div>
    </div>
  )
}

export default App
