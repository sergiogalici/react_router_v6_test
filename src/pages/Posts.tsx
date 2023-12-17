import {useContext, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {AuthContext} from '../App'

export type PostType = {
  userId: number
  id: number
  title: string
  body: string
}

export default function Posts() {
  const [isShowAll, setIsShowAll] = useState(false)
  const {users, posts} = useContext(AuthContext)
  const navigate = useNavigate()
  return (
    <div>
      <button onClick={() => navigate('/')}>&larr; Go Back</button>
      {posts
        .filter((_, i) => (isShowAll ? true : i < 10))
        .map(post => (
          <div
            style={{
              border: '1px solid #535bf2',
              marginTop: 15,
              marginBottom: 15,
              padding: '10px',
              borderRadius: '7px',
            }}
            key={post.id}>
            <Link to={`/users/${post.userId}`}>
              <p>
                Author:{' '}
                {users.find(user => user.id === post.userId)?.username ?? ''}
              </p>
            </Link>
            <Link to={`/posts/${post.id}`}>
              <h2>
                Title:{' '}
                {post.title.substring(0, 1).toUpperCase() +
                  post.title.substring(1)}
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
