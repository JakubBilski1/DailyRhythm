"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect } from "react";

export const ActivityElements = () => {
    useEffect(() => {
        const fetchActivities = async () => {
            const response = await fetch("/api/activities", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = await response.json();
            console.log(data);
        };
        fetchActivities
    }, []);
  return (
    <Card className="h-[95%] w-[66%] shadow-lg hover:shadow-symmetric-primary transition duration-300">
      <CardHeader className="flex items-center h-[10%]">
        <CardTitle>Your created activities</CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        <Tabs defaultValue="repeatables" className="w-full">
          <TabsList className="w-full flex justify-around">
            <TabsTrigger value="repeatables" className="w-1/2">
              Repeatables
            </TabsTrigger>
            <TabsTrigger value="singulars" className="w-1/2">
              Singulars
            </TabsTrigger>
          </TabsList>
          <TabsContent value="repeatables">
            <ScrollArea className="h-full w-full rounded-md border p-4">
              Jokester began sneaking into the castle in the middle of the night
              and leaving jokes all over the place: under the king's pillow, in
              his soup, even in the royal toilet. The king was furious, but he
              couldn't seem to stop Jokester. And then, one day, the people of
              the kingdom discovered that the jokes left by Jokester were so
              funny that they couldn't help but laugh. And once they started
              laughing, they couldn't stop.
            </ScrollArea>
          </TabsContent>
          <TabsContent value="singulars">
            <ScrollArea className="h-full w-full rounded-md border p-4">
              Jokester began sneaking into the castle in the middle of the night
              and leaving jokes all over the place: under the king's pillow, in
              his soup, even in the royal toilet. The king was furious, but he
              couldn't seem to stop Jokester. And then, one day, the people of
              the kingdom discovered that the jokes left by Jokester were so
              funny that they couldn't help but laugh. And once they started
              laughing, they couldn't stop.
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ActivityElements;
