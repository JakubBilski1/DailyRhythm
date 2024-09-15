"use client";

import { useAuth } from "./context/AuthContext";
import LoginPage from "./login/page";
import HomePage from "./home/page";
import LoadingSpinner from "./loading";

export default function Home() {
  const { isAuthenticated, loading } = useAuth();
  return (
    <>
      {loading ? (
        <div className="min-h-screen flex justify-center items-center">
          <LoadingSpinner width="48" height="48"/>
        </div>
      ) : isAuthenticated ? (
        <HomePage />
      ) : (
        <LoginPage />
      )}
    </>
  );
}
