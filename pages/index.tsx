import { useAuth } from '../src/authProvider';
import { SignInScreen } from '../src/SignInScreen';

export default function Home() {
  const { user, loading, logout } = useAuth()

  if (loading) return <h1>Loading...</h1>
  if (!user) return <SignInScreen />

  return (
    <main>
      <button type="button" onClick={logout} className="link">
        Logout
      </button>
    </main>
  )
}
