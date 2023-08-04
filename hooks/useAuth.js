import React from "react";
import { auth } from "../firebase/index";

/**
 *
 * @returns isUserSignedIn: If the user is signed in or not
 * @returns userEmail: email account of the signed in user
 */
export const useAuth = () => {
  const [userEmail, setUserEmail] = React.useState("");
  const [isUserSignedIn, setIsUserSignedIn] = React.useState(false);

  // "return" from useEffect ensures that the function is cleaned and only called once with empty array dependency
  // Prevent potential memory leaks
  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUserEmail(user ? user.email : "");
      setIsUserSignedIn(user ? true : false);
    });
  }, []);
  return { userEmail, isUserSignedIn };
};
