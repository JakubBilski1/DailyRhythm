"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../loading";
import AppNavigation from "@/components/layout/AppNavigation";
import CurrentDayBlock from "@/components/layout/CurrentDay";
import Schedules from "@/components/layout/Schedules";
import UpcomingEvents from "@/components/layout/UpcomingEvents";

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
        <>
          <section className="h-full flex items-center justify-around">
            <CurrentDayBlock />
            <div className="flex flex-col justify-between w-[49%] h-[95%]">
              <Schedules />
              <UpcomingEvents />
            </div>
          </section>
        </>}
    </>
  )
}
