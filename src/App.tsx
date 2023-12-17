import {createContext, useEffect, useState} from 'react'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import './App.css'
import Error from './pages/Error'
import Home from './pages/Home'
import Post from './pages/Post'
import Posts, {PostType} from './pages/Posts'
import RootLayout, {loader as rootLoader} from './pages/RootLayout'
import User from './pages/User'
import Users from './pages/Users'

type AuthContextState = {
  token: boolean
  setToken: React.Dispatch<React.SetStateAction<boolean>>
  users: UserType[]
  setUsers: React.Dispatch<React.SetStateAction<UserType[]>>
  posts: PostType[]
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>
}

export type UserType = {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: number
      lng: number
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

export const AuthContext = createContext({} as AuthContextState)

const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [token, setToken] = useState(false)
  const [users, setUsers] = useState<UserType[]>([])
  const [posts, setPosts] = useState<PostType[]>([])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(true)
    }
  }, [])

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', 'true')
    } else {
      localStorage.removeItem('token')
    }
  }, [token])

  return (
    <AuthContext.Provider
      value={{token, setToken, users, setUsers, posts, setPosts}}>
      {children}
    </AuthContext.Provider>
  )
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <Error />,
    loader: rootLoader,
    shouldRevalidate: () => false,
    children: [
      {
        path: '/',
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: '/posts',
        element: <Posts />,
        errorElement: <Error />,
        shouldRevalidate: () => false,
      },
      {
        path: '/posts/:postId',
        element: <Post />,
        errorElement: <Error />,
      },
      {
        path: '/users',
        element: <Users />,
        errorElement: <Error />,
      },
      {
        path: '/users/:userId',
        element: <User />,
        errorElement: <Error />,
      },
      {
        path: '/login',
        element: <div>Login</div>,
        errorElement: <Error />,
      },
    ],
  },
])

function App() {
  console.log('here')
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
