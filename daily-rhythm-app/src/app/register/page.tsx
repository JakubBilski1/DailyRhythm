"use client";

import React, { useState } from "react";
import Image from "next/image";
import { UserRegister } from "@/types/userTypes";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import LoadingSpinner from "../loading";

const RegisterPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [formData, setFormData] = useState<UserRegister>({
    nickname: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData: UserRegister) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      let error = "";
      if (!response.ok) {
        error = await response.text();
      }
  
      if (response.status === 201) {
        toast({
          title: "Success",
          description: "User registered successfully",
          variant: "success",
        });
        router.push("/home");
      } else if (response.status === 400) {
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        });
      } else if(response.status === 500) {
        toast({
          title: "Error",
          description: "Failed to register user",
          variant: "destructive",
        });
      }
    }catch(error) {
      console.error(error);
    }finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-brand-background flex items-center justify-center">
      <div className="bg-gray-800 shadow-symmetric-primary rounded-lg p-8 w-full max-w-md">
        {/* App Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/images/logo-no-background.svg"
            alt="App Logo"
            width={200}
            height={100}
            className="w-80"
          />
        </div>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="nickname"
              className="block text-sm font-medium text-white"
            >
              Nickname
            </label>
            <input
              type="text"
              id="nickname"
              className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary"
              placeholder="nickname"
              onChange={(e) => handleChange(e)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary"
              placeholder="you@example.com"
              onChange={(e) => handleChange(e)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary"
              placeholder="••••••••"
              onChange={(e) => handleChange(e)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="repeatPassword"
              className="block text-sm font-medium text-white"
            >
              Repeat Password
            </label>
            <input
              type="password"
              id="repeatPassword"
              className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary"
              placeholder="••••••••"
              onChange={(e) => handleChange(e)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-brand-primary hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded-md shadow-lg transition duration-300"
            onClick={(e) => handleSubmit(e)}
          >
            {loading ? <LoadingSpinner width="8" height="8"/> : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-white">
          Already a member?{" "}
          <a href="/login" className="text-brand-primary hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
