import { auth } from "@/src/firebase/config";
import { router } from "expo-router";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface IAuthContext {
  user: User | null;
  signIn: (email: string, password: string) => void;
  signUp: (email: string, password: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signIn = async (email: string, password: string) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      setUser(user.user);
      router.replace("/(app)");
    } catch (error) {
      console.log("Erro ao logar: ", error);
      return false;
    }
  };

  const signUp = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        signIn(email, password);
      })
      .catch((error) => {
        console.log(error instanceof Error ? error.message : "Sign up error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const logout = () => {
    auth.signOut();
    setUser(null);
    router.replace("/sign-in");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signUp,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("contexto não encontrado");
  }
  return context;
};
