import { Link } from 'react-router-dom'
import NavLogin from '../components/NavLogin'

const Welcome = () => {
  return (
    <>
      <NavLogin />
      <div className="container-fluid text-center my-5">
        <h1>Welcome to homepage!</h1>
        <p>***The content inside requires <span><Link to="/login">login</Link></span>.***</p>
      </div>
    </>
  )
}

export default Welcome
