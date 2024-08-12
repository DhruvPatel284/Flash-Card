import prisma from "@/lib/prismadb";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { AdminId } = await req.json();
  console.log(AdminId);

  if (!AdminId) {
    return new NextResponse("AdminId parameter is missing", { status: 400 });
  }

  try {
    const flashcards = await prisma.flashcard.findMany({
      where: {
        adminId: AdminId,
      },
    });

    if (flashcards.length > 0) {
      return NextResponse.json(flashcards);
    } else {
      return new NextResponse("No flashcards found for this Admin", { status: 204 });
    }
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
