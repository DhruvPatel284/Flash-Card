import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { question, answer,adminId} = await req.json();

    if (!question || !answer ) {
      return new NextResponse("Missing question or answer", { status: 400 });
    }
    if(!adminId){
        return new NextResponse("Admin is not logged in", { status: 402 });
    }

    const flashcard = await prismadb.flashcard.create({
      data: {
        question,
        answer,
        adminId,
      },
    });

    return NextResponse.json(flashcard);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
