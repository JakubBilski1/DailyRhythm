"use client"

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { router } from "@/utils/router";

const AppNavigation = () => {
  const [userName, setUserName] = useState<string>("");
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("/api/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setUserName(data.nickname);
    };
    fetchUser();
  }, []);
  return (
    <header className="flex justify-between p-8 items-center shadow-symmetric-primary bg-brand-background">
      <Image
        src="/images/logo-no-background.svg"
        alt="App Logo"
        width={200}
        height={100}
        className="w-[14%]"
      />
      <NavigationMenu>
        <NavigationMenuList>
          {router.map(({ link, name }) => {
            return (
              <NavigationMenuItem>
                <Link href={link} passHref legacyBehavior>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="w-[14%] flex items-center justify-center gap-4">
        <p>Welcome, {userName}</p>
        <Avatar className="w-16 h-16">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default AppNavigation;
