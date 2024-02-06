import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthenCheck } from '../components/AuthenCheck'
import NavHome from "../components/NavHome"

function Blog() {
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
        <>
            <NavHome />
            <div className="container-fluid text-center my-5">
                <h1>You haven't posted any blogs yet.</h1>
            </div>
        </>
    )
}

export default Blog