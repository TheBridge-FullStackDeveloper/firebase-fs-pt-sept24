import { useContext, useState, useEffect, createContext } from "react";
import { auth } from "../config/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loadingSession, setLoadingSession] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        navigate("/");
      }
      setLoadingSession(false);
    });

    return unsubscribe;
  }, []);

  if (loadingSession) {
    return <h1>Loading...</h1>;
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
