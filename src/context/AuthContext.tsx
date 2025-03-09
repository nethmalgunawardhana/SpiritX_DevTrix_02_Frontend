"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  User 
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  role: string | null;
  register: (email: string, password: string, username: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  interface IUser {
    uid: string;
    email: string;
    username: string;
    role: string;
    budgetRemaining: number;
    };

  // Function to fetch user role from Firestore
  const fetchUserRole = async (username: string) => {
    try {
      const userDoc = await getDoc(doc(db, "users", username));
      console.log("userDoc for ",username , userDoc);
      const firestoreUser = userDoc.data() as IUser;
      if (  firestoreUser.username === username) {
        console.log("user exists",userDoc.data());
        const role = userDoc.data()?.role;
        setRole(role);
        localStorage.setItem("role", role);
        console.log("Role set from Firestore:", role);
      }
      else{
        console.log("user does not exist");
      }
    } catch (error) {
      console.error("Error fetching role:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // Check localStorage first to avoid unnecessary Firestore calls
        console.log("currentUser",currentUser);
        const storedRole = localStorage.getItem("role");
        if (storedRole) {
          setRole(storedRole);
        } else {
            const username = currentUser.email?.split("@")[0] as string;
          await fetchUserRole(username);
        }
      } else {
        setRole(null);
        localStorage.removeItem("role");
      }
    });

    return () => unsubscribe();
  }, []);

  const register = async (email: string, password: string, username: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email,
      username,
      role: "team_owner",
      budgetRemaining: 9000000,
    });

    setRole("team_owner");
    localStorage.setItem("role", "team_owner"); // Store in localStorage
    router.push("/dashboard");
  };

  const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await fetchUserRole(user.uid);

    router.push("/dashboard");
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setRole(null);
    localStorage.removeItem("role");
    router.push("/login");
  };

  return <AuthContext.Provider value={{ user, role, register, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
