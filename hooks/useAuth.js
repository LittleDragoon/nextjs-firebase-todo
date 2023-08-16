import React from "react";
import { auth } from "../firebase/index";

/**
 *
 * @returns isUserSignedIn: If the user is signed in or not
 * @returns user
 */
export const useAuth = () => {
  const [user, setUser] = React.useState("");
  const [isUserSignedIn, setIsUserSignedIn] = React.useState(false);

  // "return" from useEffect ensures that the function is cleaned and only called once with empty array dependency
  // Prevent potential memory leaks
  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user ?? "");
      setIsUserSignedIn(user ? true : false);
    });
  }, []);
  return { user, isUserSignedIn };
};
