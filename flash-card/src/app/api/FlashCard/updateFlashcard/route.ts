import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const { id, question, answer } = await req.json();

    if (!id || !question || !answer) {
      return new NextResponse("Missing ID, question, or answer", { status: 400 });
    }

    const flashcard = await prismadb.flashcard.update({
      where: { id },
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
