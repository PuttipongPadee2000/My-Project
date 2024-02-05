import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import NavLogin from "../components/NavLogin.tsx";

function Login() {
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            const response = await axios.post('http://localhost:5000/login', {
                username,
                password                
            })

            const { status, message, token } = response.data

            if (status === 'error') {
                alert(message)
            } else if (status === 'ok') {
                localStorage.setItem('token', token)
                navigate('/')
            }

        } catch (error) {
            console.error(error)
        }
    }

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    return (
        <>
            <NavLogin />
            <div className="container-fluid text-center">
                <div className="container my-5">
                    <div className="mb-4">
                        <h1>Login</h1>
                    </div>
                    <form className="mb-4" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                            autoComplete="off"
                            autoFocus
                            className="form-control mx-auto w-auto"
                            id="username"
                            name="username"
                            placeholder="Username"
                            type="text" 
                            value={username}
                            onChange={handleUsernameChange}
                            required
                            />                            
                        </div>

                        <div className="mb-3">
                            <input
                            className="form-control mx-auto w-auto"
                            id="password"
                            name="password"
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                            />
                        </div>

                        <button className="btn btn-primary" type="submit">Login</button>              
                    </form>    
                    <div>
                        <a href='/register'>Don't have an account?</a>
                    </div>        
                </div>
            </div>
        </>
    )
}

export default Login