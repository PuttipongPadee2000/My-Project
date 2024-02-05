import axios from 'axios'

export const AuthenCheck = async () => {
  try {
    const token = localStorage.getItem('token')

    if (token === null) {
      return false
    }

    const response = await axios.get('http://localhost:5000/authentication', {
      headers: { 'authorization': 'bearer ' + token }
    })

    const { authority } = response.data

    if (authority === 'Unauthorized') {
      localStorage.removeItem('token')
      return false
    }

    return true

  } catch (error) {
    console.error(error)
    return false
  }
}
