import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function NavHome() {
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
    return (
        <>
            <nav className="bg-dark navbar navbar-expand-md navbar-dark">
                <div className="container-fluid">
                    <div className="container-fluid">
                        <Link to="/" className="navbar-brand">HOME</Link>
                    </div>                    
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/blog" className="nav-link" >Blog</Link>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link" onClick={handleLogout} >Logout</button>
                        </li>                   
                    </ul>                
                </div>
            </nav>
        </>
    );
}

export default NavHome;