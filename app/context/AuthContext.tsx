import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { auth } from "../config/firebaseConf";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { Alert } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

interface AuthContextProps {
  user: User | null;

  handleLogin: (
    email: string,
    password: string,
    navigation: NavigationProp<ParamListBase>
  ) => void;
  handleRegister: (
    email: string,
    password: string,
    navigation: NavigationProp<ParamListBase>
  ) => void;
  handleLogOut: (navigation: NavigationProp<ParamListBase>) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (
    email: string,
    password: string,
    navigation: NavigationProp<ParamListBase>
  ) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Login Successful");
      (navigation as any).replace("TodoList");
    } catch (error: any) {
      console.error(error);
      Alert.alert("Login Failed", error.message);
    }
  };

  const handleRegister = async (
    email: string,
    password: string,
    navigation: NavigationProp<ParamListBase>
  ) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Registration Successful");
      (navigation as any).replace("TodoList");
    } catch (error: any) {
      console.error(error);
      Alert.alert("Registration Failed", error.message);
    }
  };

  const handleLogOut = async (navigation: NavigationProp<ParamListBase>) => {
    try {
      await signOut(auth);
      Alert.alert("Logged Out");
      (navigation as any).replace("Login");
    } catch (error: any) {
      console.error(error);
      Alert.alert("Logout Failed", error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, handleLogin, handleRegister, handleLogOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () : AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
