import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

function Nav(props: any) {
    const navigate = useNavigate()

    const handleLogout = (event: React.MouseEvent) => {
        event.preventDefault()

        try {
            localStorage.removeItem('token')
            navigate('/home')
        } catch (error) {
            console.log('Error message:', error)
        }
    }

    const Welcome = 
        <nav className="bg-dark navbar navbar-expand-md navbar-dark">
            <div className="container-fluid">
                <div className="container-fluid">
                    <Link to="/home" className="navbar-brand">HOME</Link>
                </div>                    
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/login" className="nav-link" >Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/register" className="nav-link">Register</Link>
                    </li>                       
                </ul>                
            </div>
        </nav>

    const User = 
        <nav className="bg-dark navbar navbar-expand-md navbar-dark">
            <div className="container-fluid">
                <div className="container-fluid">
                    <Link to="/home" className="navbar-brand">HOME</Link>
                </div>                    
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <button className="nav-link" onClick={handleLogout} >Logout</button>
                    </li>                   
                </ul>                
            </div>
        </nav>

    return (props.isLoggedIn ? User : Welcome)
}

Nav.proptypes = {
    isLoggedIn: PropTypes.bool
}

export default Nav