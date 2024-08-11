import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { question, answer } = await req.json();

    if (!question || !answer) {
      return new NextResponse("Missing question or answer", { status: 400 });
    }

    const flashcard = await prismadb.flashcard.create({
      data: {
        question,
        answer,
      },
    });

    return NextResponse.json(flashcard);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
