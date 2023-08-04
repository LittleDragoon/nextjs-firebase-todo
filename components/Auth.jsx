import React from "react";
import { FaGoogle } from "react-icons/fa";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/index";

export const Auth = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [status, setStatus] = React.useState("Pending");
  const [userEmail, setUserEmail] = React.useState("");
  const [isUserLogged, setIsUserLogged] = React.useState(false);

  // To sign in with Google the first time
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        /**
         * Not useful right now but for future references
         */
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const email = result.user.email;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        throw new Error("Error in Log in");
      });
  };

  auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in
      console.log("User is signed in:", user.displayName, user.email);
      setUserEmail(user.email);
      setIsUserLogged(true);
    } else {
      // User is signed out or not signed in
      console.log("User is signed out");
      setUserEmail("");
      setIsUserLogged(false);
    }
  });
  return (
    <>
      {!isUserLogged && (
        <button
          onClick={signInWithGoogle}
          className="flex items-center gap-x-2 text-gray-200 bg-gradient-to-tr from-[#042354] to-[#004e92] rounded-md my-4 px-2 font-bold text-center"
        >
          <FaGoogle />
          <span>Log in with Google</span>
        </button>
      )}
      {isUserLogged && (
        <div className="flex gap-x-2 items-center">
          <div className="font-bold text-white">Connected with {userEmail}</div>
          <button
            onClick={() => {
              auth.signOut();
            }}
            className="flex items-center gap-x-2 text-gray-200 bg-gradient-to-tr from-[#042354] to-[#004e92] rounded-md my-4 px-2 font-bold text-center"
          >
            <span>Log out</span>
          </button>
        </div>
      )}
    </>
  );
};
