import { Link } from 'react-router-dom'


function NavLogin() {
    return (
        <>
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
        </>
    );
}

export default NavLogin;