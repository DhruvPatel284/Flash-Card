import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import jwt from "jsonwebtoken";
var bcrypt = require("bcryptjs");

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json(
      {
        message: "Email and Password are required",
      },
      { status: 400 }
    );
  }

  try {
    // Check if the user is an admin
    const isAdminEmail = email.endsWith("@admin.com");
    const adminPassword = process.env.ADMIN_PASSWORD;

    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid credentials",
        },
        { status: 403 }
      );
    }

    // Check password based on role
    let passwordMatching = false;
    if (isAdminEmail) {
      passwordMatching = password === adminPassword;
    } else {
      passwordMatching = await bcrypt.compare(password, user.password);
    }

    if (!passwordMatching) {
      return new NextResponse("Invalid credentials", { status: 401 });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role, // Ensure that the role is included in the token
      },
      process.env.JWT_SECRET || "",
      {
        expiresIn: "24h",
      }
    );

    const modifiedUser = { email: user.email, id: user.id };

    const response = new NextResponse(
      JSON.stringify({
        message: "Successfully logged in",
        user: { ...modifiedUser },
      })
    );

    response.headers.set(
      "Set-Cookie",
      `token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}`
    );

    return response;
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        message: "Internal Error",
      },
      { status: 500 }
    );
  }
}
