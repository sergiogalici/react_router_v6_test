import {useContext, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {AuthContext} from '../App'

export type PostType = {
  userId: number
  id: number
  title: string
  body: string
}

export default function Users() {
  const [isShowAll, setIsShowAll] = useState(false)
  const {users} = useContext(AuthContext)
  const navigate = useNavigate()
  return (
    <div>
      <button onClick={() => navigate('/')}>&larr; Go Back</button>
      {users
        .filter((_, i) => (isShowAll ? true : i < 10))
        .map(user => (
          <div
            style={{
              border: '1px solid #535bf2',
              marginTop: 30,
              marginBottom: 30,
              padding: '10px',
              borderRadius: '7px',
            }}
            key={user.id}>
            <Link to={`/users/${user.id}`}>
              <h2>
                Username:{' '}
                {user.username.substring(0, 1).toUpperCase() +
                  user.username.substring(1)}
              </h2>
            </Link>
          </div>
        ))}
      <button onClick={() => setIsShowAll(prev => !prev)}>
        {isShowAll ? 'Show Less' : 'Show More'}
      </button>
    </div>
  )
}
