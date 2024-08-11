import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { flashcardId: string } }
) {
  try {
    const flashcardId = context.params.flashcardId;

    if (!flashcardId) {
      return new NextResponse("flashcardId parameter is missing", { status: 400 });
    }

    const flashcard = await prisma.flashcard.findFirst({
      where: {
        id: flashcardId,
      },
    });

    if (flashcard) {
      return NextResponse.json(flashcard);
    } else {
      return new NextResponse("Flashcard not found", { status: 404 });
    }
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
