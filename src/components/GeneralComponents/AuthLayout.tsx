"use client";
import { ReactNode } from "react";
import useAuth from "@/hooks/useAuth";

const AuthLayout = ({ children }: { children: ReactNode }) => {
    const loadingAuth = useAuth();

    if (loadingAuth) return null; // ✅ Hides everything until auth check is done

    return <>{children}</>;
};

export default AuthLayout;
