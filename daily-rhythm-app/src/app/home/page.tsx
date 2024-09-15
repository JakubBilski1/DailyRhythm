"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../loading";
import AppNavigation from "@/components/layout/AppNavigation";

export default function HomePage() {
  const { isAuthenticated, loading } = useAuth();
  console.log(isAuthenticated, loading);
  const router = useRouter();
  useEffect(() => {
    !isAuthenticated && !loading && router.push("/login");
  }, [loading]);
  return (
    <>
      {loading ? <div className="min-h-screen flex justify-center items-center">
          <LoadingSpinner width="48" height="48"/>
        </div> : 
        <div className="bg-brand-background h-full">
          <AppNavigation />  
        </div>}
    </>
  )
}
