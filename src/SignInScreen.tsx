import { firebaseApp } from "./initFirebase";
import { EmailAuthProvider, GithubAuthProvider, getAuth } from "@firebase/auth";
import { useEffect } from "react";
import { useAuth } from "./authProvider";


export function SignInScreen() {
  const auth = useAuth()

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={() => auth.loginWithGithub()} >Login with Github</button>
    </div>
  );
}