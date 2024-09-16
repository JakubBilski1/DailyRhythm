// components/CurrentDayBlock.js
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const CurrentDayBlock = () => {
  // Get current day
  const currentDay = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card className="h-[95%] w-[49%] shadow-lg hover:shadow-symmetric-primary transition duration-300">
      <CardHeader>
        <CardTitle>Current Day: {currentDay}, {currentDate}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};

export default CurrentDayBlock;
