import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthenCheck } from '../components/AuthenCheck'
import { Link } from 'react-router-dom'
import NavHome from '../components/NavHome'

function CreateBlog() {
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
                <h1>Topic:</h1>
            </div>          
        </>
    )
}

export default CreateBlog