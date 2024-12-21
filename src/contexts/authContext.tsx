import { useFirabase } from "@/hooks/useFirabase";
import { onAuthStateChanged, User } from "firebase/auth";
import { Loader2 } from "lucide-react";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  handlerLogin: () => Promise<void>
  handlerLogout: () => Promise<void>
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { signInWithPopup, googleProvider, auth, signOut } = useFirabase()
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        handlerLogout()
        setIsLoading(false)
        navigate('/')
        return;
      }

      setUser(currentUser);
      setIsAuthenticated(!!currentUser)
      setIsLoading(false)
      navigate('/chat')
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-2">
        <Loader2 className="animate-spin text-zinc-100" size={40} />
      </div>
    )
  }

  const handlerLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      setUser(result.user)
      setIsAuthenticated(!!result.user)
    } catch (error) {
      toast.error('Erro ao tentar logar')
      console.log(error)
    }
  };

  const handlerLogout = async () => {
    try {
      signOut(auth)
        .then(() => {
          setUser(null)
          setIsAuthenticated(false)
        })
    } catch (error) {
      toast.error('Erro ao tentar deslogar')
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, handlerLogin, handlerLogout }}>
      {children}
    </AuthContext.Provider>
  );
};