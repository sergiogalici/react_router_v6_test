import {useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import {AuthContext} from '../App'

export default function Login() {
  const {setToken} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleClick = () => {
    setToken(true)
    navigate(0)
  }
  return (
    <div>
      <p>You are not logged in! Please log in to enter this page</p>
      <button onClick={handleClick}>Press here to login</button>
    </div>
  )
}
