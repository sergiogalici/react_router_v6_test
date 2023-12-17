import {useContext, useEffect} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {AuthContext} from '../App'

export default function User() {
  const navigate = useNavigate()
  const {userId} = useParams()
  const {users, posts} = useContext(AuthContext)
  const currentUser = users?.find(user => user.id === parseInt(userId ?? '0'))

  useEffect(() => {
    if (!currentUser && users.length > 0) {
      throw new Error('User not found')
    }
  }, [users, currentUser])

  return (
    <div>
      <button onClick={() => navigate('/users')}>&larr; Go Back</button>
      <p>Name: {currentUser?.username}</p>
      <p>Email: {currentUser?.email}</p>
      <p>Website: {currentUser?.website}</p>
      <p>
        <b>Posts:</b>
      </p>
      {posts
        .filter(post => post.userId === currentUser?.id)
        .map(post => (
          <Link to={`/posts/${post.id}`}>
            <div
              style={{
                border: '1px solid #535bf2',
                marginTop: 15,
                marginBottom: 15,
                padding: '10px',
                borderRadius: '7px',
              }}
              key={post.id}>
              <p>
                Title:{' '}
                {post.title.substring(0, 1).toUpperCase() +
                  post.title.substring(1)}
              </p>
            </div>
          </Link>
        ))}
    </div>
  )
}
