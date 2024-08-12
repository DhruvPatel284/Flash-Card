import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import jwt from "jsonwebtoken";
var bcrypt = require("bcryptjs");

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password} = body;

  if (!email || !password) {
    return new NextResponse("Email and Password are required", { status: 400 });
  }

  try {
    // Check if user is admin
    const isAdminEmail = email.endsWith("@admin.com"); // You can adjust this condition
    const adminPassword = process.env.ADMIN_PASSWORD;

    let isAdmin = false;

    if (isAdminEmail) {
      // Verify admin password
      if (password === adminPassword) {
        isAdmin = true;
      } else {
        return new NextResponse("Invalid admin password", { status: 403 });
      }
    }

    // Find user in the database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Hash the password if not admin
    const hashedPassword = isAdmin ? null : await bcrypt.hash(password, 10);

    if (!user) {
      const newUser = await prisma.user.create({
        data: {
          
          email,
          password: isAdmin ? adminPassword : hashedPassword,
          role: isAdmin ? "ADMIN" : "USER", // Add a role field to your schema
        },
      });

      const token = jwt.sign(
        { userId: newUser.id, email: newUser.email, role: newUser.role },
        process.env.JWT_SECRET || "",
        {
          expiresIn: "1d",
        }
      );

      const response = new NextResponse(
        JSON.stringify({
          message: "Successfully Account Created",
          id: newUser.id,
        }),
        { status: 200 }
      );

      response.headers.set(
        "Set-Cookie",
        `token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}`
      );
      return response;
    } else {
      return new NextResponse("User Already Exists", { status: 403 });
    }
  } catch (e) {
    console.log(e);
    return new NextResponse(
      JSON.stringify({ message: "Internal Error" }),
      { status: 500 }
    );
  }
}
