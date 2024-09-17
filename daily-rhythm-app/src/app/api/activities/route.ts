import { Token } from "@/types/userTypes";
import { verifyJWT } from "@/utils/verifyJWT";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { act } from "react";
const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
  const authorizationHeader = req.headers.get("Authorization");

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return new Response("Unauthorized: No token provided", { status: 401 });
  }

  const token = authorizationHeader.split(" ")[1];
  try {
    const verify = await verifyJWT(token);
    if (verify.status === 200) {
      const decoded = jwt.decode(token) as Token;
      const id = decoded.id;
      const activities = await prisma.activities.findMany({
        where: {
          userId: id,
        },
      });
      return new Response(JSON.stringify(activities), { status: 200 });
    } else {
      return new Response("Unauthorized", { status: 401 });
    }
  } catch (err) {
    console.log(err);
  }
};

export const POST = async (req: NextRequest) => {
    const data = await req.json();
    const { token, activityName, repeatable, priority, date, steps } = data
    try {
      const verify = await verifyJWT(token);
      if (verify.status === 200) {
        const decoded = jwt.decode(token) as Token;
        const id = decoded.id;
        if(!activityName || !repeatable || !priority) {
            console.log(activityName, repeatable, priority)
          return new Response("Missing required fields", { status: 400 });
        }
        if(repeatable === 1) {
            if(!date) {
                console.log(date, repeatable)
                return new Response("Missing required fields", { status: 400 });
            }
        }
        const activity = await prisma.activities.create({
          data: {
            activityName,
            repeat: repeatable,
            priority,
            date,
            steps,
            userId: id
          }
        });
        return new Response(JSON.stringify(activity), { status: 200 });
      } else {
        return new Response("Unauthorized", { status: 401 });
      }
    } catch (err) {
      console.log(err);
    }
  };