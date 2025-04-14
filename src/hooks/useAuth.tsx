"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      router.replace("/");
    } else {
      setLoading(false); 
    }
  }, [router]);

  return loading; 
};

export default useAuth;
