import {useContext, useEffect} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {AuthContext} from '../App'
import {PostType} from './Posts'

export default function Post() {
  const {users, posts} = useContext(AuthContext)
  const {postId} = useParams()
  const navigate = useNavigate()

  const post = posts.find(
    post => post.id === parseInt(postId ?? '0'),
  ) as PostType

  if (!post) {
    throw new Error('Post not found')
  }

  useEffect(() => {
    if (!post && posts.length > 0) {
      throw new Error('Post not found')
    }
  }, [posts, post])

  return (
    <div
      style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div
        style={{
          maxWidth: '300px',
          border: '1px solid #242424',
          padding: '10px',
          borderRadius: '7px',
        }}>
        <button onClick={() => navigate('/posts')}>&larr; Go Back</button>
        <Link to={`/users/${post.userId}`}>
          <p>
            Author:{' '}
            {users.find(user => user.id === post.userId)?.username ?? ''}
          </p>
        </Link>
        <h2>
          Title:{' '}
          {post.title.substring(0, 1).toUpperCase() + post.title.substring(1)}
        </h2>
        <p>
          {post.body.substring(0, 1).toUpperCase() + post.body.substring(1)}
        </p>
      </div>
    </div>
  )
}
