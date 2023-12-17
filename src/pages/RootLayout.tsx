import {useContext, useEffect} from 'react'
import {Link, Outlet, useLoaderData} from 'react-router-dom'
import {AuthContext, UserType} from '../App'
import Login from './Login'
import {PostType} from './Posts'

export default function RootLayout() {
  const {users, posts} = useLoaderData() as {
    users: UserType[]
    posts: PostType[]
  }
  const {token, setUsers, setPosts, setToken} = useContext(AuthContext)

  useEffect(() => {
    if (users) {
      setUsers(users)
    }

    if (posts) {
      setPosts(posts)
    }
  }, [users, posts, setUsers, setPosts])
  return (
    <div>
      {token ? (
        <div>
          <nav
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 30,
              gap: 50,
              padding: 6,
              backgroundColor: 'lightgray',
            }}>
            <div
              style={{
                display: 'flex',
                gap: 5,
                marginLeft: 10,
              }}>
              <Link
                style={{
                  backgroundColor: 'dodgerblue',
                  borderRadius: '5px',
                  padding: '5px',
                  color: 'white',
                  textDecoration: 'none',
                }}
                to="/posts">
                Posts
              </Link>
              <Link
                style={{
                  backgroundColor: 'dodgerblue',
                  borderRadius: '5px',
                  padding: '5px',
                  color: 'white',
                  textDecoration: 'none',
                }}
                to="/users">
                Users
              </Link>
            </div>
            <div
              style={{
                marginRight: 10,
              }}>
              <button onClick={() => setToken(false)}>Logout</button>
            </div>
          </nav>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <main style={{width: '60%'}}>
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  const usersData = await fetch('https://jsonplaceholder.typicode.com/users')
  const postsData = await fetch('https://jsonplaceholder.typicode.com/posts')

  const users = await usersData.json()
  const posts = await postsData.json()
  return {users, posts}
}
