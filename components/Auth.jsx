import React from "react";
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "../hooks/useAuth";
import { auth } from "../firebase/index";
import { useToast } from "@chakra-ui/react";

export const Auth = () => {
  const { user, isUserSignedIn } = useAuth();
  const toast = useToast();

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
        //Create a popup for the user
        toast({
          title: "Signed in successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
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

  const signOut = () => {
    auth.signOut();
    toast({
      title: "Signed out successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <>
      {!isUserSignedIn && (
        <>
          <button
            onClick={signInWithGoogle}
            className="flex items-center p-3 gap-x-2 rounded-md my-4 font-bold text-center text-gray-200 transition-all duration-500 bg-gradient-to-t from-[#302b63] via-[#042354] to-[#004e92] bg-size-200 bg-pos-0 hover:bg-pos-100"
          >
            <FaGoogle />
            <span>Log in with Google</span>
          </button>
        </>
      )}
      {isUserSignedIn && (
        <div className="flex gap-x-2 items-center">
          <div className="text-white">
            Connected with{" "}
            <span className="italic font-bold">{user.email}</span>
          </div>
          <button
            onClick={signOut}
            className="flex items-center p-2 my-4 rounded-md font-bold text-center gap-x-2 text-gray-200 bg-gradient-to-b from-[#004e92] to-[#042354]"
          >
            <span>Log out</span>
          </button>
        </div>
      )}
    </>
  );
};
