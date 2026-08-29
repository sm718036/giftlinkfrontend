import { createContext, useContext, useEffect, useState } from "react";
import { useGetMe } from "../hooks/authHooks";

const AppContext = createContext();

export const AuthProvider = ({ children }) => {
  const [hasToken, setHasToken] = useState(!!localStorage.getItem("auth-token"));
  const { user, isLoadingUser, isErrorInGettingUser } = useGetMe(hasToken);

  useEffect(() => {
    if (hasToken && isErrorInGettingUser) {
      localStorage.removeItem("auth-token");
      setHasToken(false);
    }
  }, [hasToken, isErrorInGettingUser]);

  return (
    <AppContext.Provider
      value={{
        user,
        isLoadingUser,
        isErrorInGettingUser,
        isAuthenticated: !!user && Object.keys(user).length > 0,
        hasToken,
        setHasToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);
