import { Token } from "@/types/userTypes";
import { verifyJWT } from "@/utils/verifyJWT";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
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
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });
      return new Response(JSON.stringify(user), { status: 200 });
    } else {
      return new Response("Unauthorized", { status: 401 });
    }
  } catch (err) {
    console.log(err);
  }
};
