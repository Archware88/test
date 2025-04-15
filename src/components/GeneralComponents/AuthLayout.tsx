"use client";
import { ReactNode } from "react";
import useAuth from "@/hooks/useAuth";

const AuthLayout = ({ children }: { children: ReactNode }) => {
    const loadingAuth = useAuth();

    if (loadingAuth) return null;

    return <>{children}</>;
};

export default AuthLayout;
