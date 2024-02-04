import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { AuthenCheck } from '../components/AuthenCheck'
import axios from "axios"

function Homepage() {
    return (
        <>
            <h1>Welcome to the store!</h1>
        </>
    )
}

export default Homepage