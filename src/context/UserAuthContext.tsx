import React, { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User as FirebaseUser,
} from "firebase/auth";
import {
  auth,
  googleProvider,
  facebookProvider,
  isFirebaseInitialized,
} from "../services/firebase";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  provider?: "email" | "google" | "facebook";
  phone?: string;
  address?: string;
  bairro?: string;
  cidade?: string;
  cep?: string;
  role?: "Admin" | "Cliente";
  status?: "Ativo" | "Inativo";
}

interface UserAuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<boolean>;
  socialLogin: (provider: "google" | "facebook") => Promise<void>;
  register: (data: Partial<User> & { password?: string }) => Promise<boolean>;
  deleteAccount: () => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const UserAuthContext = createContext<UserAuthContextType | undefined>(
  undefined,
);

export const UserAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if we have a persisted mock session (only if firebase is not active)
    if (!isFirebaseInitialized || !auth) {
      const storedUser = localStorage.getItem("mockUser");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(mapFirebaseUser(firebaseUser));
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const mapFirebaseUser = (firebaseUser: FirebaseUser): User => {
    const providerData = firebaseUser.providerData[0];
    return {
      id: firebaseUser.uid,
      name:
        firebaseUser.displayName ||
        firebaseUser.email?.split("@")[0] ||
        "Usuário",
      email: firebaseUser.email || "",
      avatar: firebaseUser.photoURL || undefined,
      provider: providerData?.providerId.includes("google")
        ? "google"
        : providerData?.providerId.includes("facebook")
          ? "facebook"
          : "email",
    };
  };

  const login = async (email: string, pass: string) => {
    const usersDb = JSON.parse(localStorage.getItem("users_db") || "[]");
    const foundUser = usersDb.find(
      (u: any) => u.email === email && u.password === pass,
    );

    if (foundUser) {
      if (foundUser.status === "Inativo") {
        alert("Esta conta foi desativada pelo administrador.");
        return false;
      }

      const { password, ...userWithoutPass } = foundUser;
      setUser(userWithoutPass);
      localStorage.setItem("mockUser", JSON.stringify(userWithoutPass));
      return true;
    }

    if (auth) {
      try {
        await signInWithEmailAndPassword(auth, email, pass);
        return true;
      } catch (error) {
        console.error("Login error:", error);
      }
    }

    if (email === "admin@digitalstore.com" && pass === "admin123") {
      const adminUser = {
        id: "admin-id",
        name: "Administrador",
        email: "admin@digitalstore.com",
        provider: "email" as const,
      };
      setUser(adminUser);
      localStorage.setItem("mockUser", JSON.stringify(adminUser));
      return true;
    }

    return false;
  };

  const socialLogin = async (provider: "google" | "facebook") => {
    if (!auth) {
      // Mock Social Login
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const mockUser: User = {
        id: `mock-${Date.now()}`,
        name:
          provider === "google"
            ? "Usuário Google (Demo)"
            : "Usuário Facebook (Demo)",
        email: `demo@${provider}.com`,
        avatar:
          provider === "google"
            ? "https://ui-avatars.com/api/?name=Google+User&background=random"
            : "https://ui-avatars.com/api/?name=Facebook+User&background=1877F2&color=fff",
        provider: provider,
      };
      setUser(mockUser);
      localStorage.setItem("mockUser", JSON.stringify(mockUser));
      return;
    }
    try {
      const authProvider =
        provider === "google" ? googleProvider : facebookProvider;
      await signInWithPopup(auth, authProvider);
    } catch (error) {
      console.error("Social login error:", error);
      throw error;
    }
  };

  const register = async (data: Partial<User> & { password?: string }) => {
    const usersDb = JSON.parse(localStorage.getItem("users_db") || "[]");

    if (usersDb.some((u: any) => u.email === data.email)) {
      return false;
    }

    const newUser: any = {
      id: `user-${Date.now()}`,
      name: data.name || data.email?.split("@")[0] || "User",
      email: data.email || "",
      provider: "email",
      phone: data.phone,
      address: data.address,
      bairro: data.bairro,
      cidade: data.cidade,
      cep: data.cep,
      role: "Cliente",
      status: "Ativo",
      password: data.password, // Save password for mock auth
    };

    usersDb.push(newUser);
    localStorage.setItem("users_db", JSON.stringify(usersDb));

    if (!auth) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return true;
    }

    try {
      if (!data.password || !data.email)
        throw new Error("Email and Password required");
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      return true;
    } catch (error) {
      console.error("Registration error:", error);

      return true;
    }
  };

  const deleteAccount = async () => {
    if (!auth) {
      setUser(null);
      localStorage.removeItem("mockUser");
      return;
    }
    try {
      if (auth.currentUser) {
        await auth.currentUser.delete();
      }
    } catch (error) {
      console.error("Delete account error:", error);
      throw error;
    }
  };

  const logout = async () => {
    if (!auth) {
      setUser(null);
      localStorage.removeItem("mockUser");
      return;
    }
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <UserAuthContext.Provider
      value={{
        user,
        login,
        socialLogin,
        register,
        deleteAccount,
        logout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error("useUserAuth must be used within a UserAuthProvider");
  }
  return context;
};
