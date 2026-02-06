import React, { createContext, useContext, useState } from "react";

interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor";
}

interface AdminAuthContextType {
  user: AdminUser | null;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
  undefined,
);

const MOCK_ADMINS: AdminUser[] = [
  { id: 1, name: "Jardheson", email: "jardheson@gmail.com", role: "admin" },
];

const MOCK_PASS = "123456";

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AdminUser | null>(() => {
    const storedUser = localStorage.getItem("adminUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isLoading] = useState(false);

  const login = async (email: string, pass: string) => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (email === "jardheson@gmail.com" && pass === MOCK_PASS) {
      const admin = MOCK_ADMINS[0];
      setUser(admin);
      localStorage.setItem("adminUser", JSON.stringify(admin));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("adminUser");
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};
