import { User, getAuth, onAuthStateChanged, GithubAuthProvider, signInWithPopup } from 'firebase/auth'
import { createContext, FunctionComponent, useContext, useEffect, useState } from "react";

import { firebaseApp } from "./initFirebase";

interface IContext {
  user: User | null
  loading: boolean
  logout: () => void,
  loginWithGithub: () => void
}

const AuthContext = createContext<IContext>({
  user: null,
  loading: true,
  logout: () => { },
  loginWithGithub: () => { }
})

const AuthProvider: FunctionComponent = ({ children }) => {
  const auth = getAuth(firebaseApp)

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const logout = () => getAuth(firebaseApp).signOut()

  const loginWithGithub = async () => {
    const provider = new GithubAuthProvider()
    await signInWithPopup(auth, provider)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [auth])

  return (
    <AuthContext.Provider value={{ user, loading, logout, loginWithGithub }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  return useContext(AuthContext)
}

export { AuthProvider, useAuth }