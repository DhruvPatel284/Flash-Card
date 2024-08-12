import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json(); 
    console.log(id);

    if (!id) {
      return new NextResponse("Missing flashcard ID", { status: 400 });
    }
    const flashcard = await prisma.flashcard.delete({
      where: { id: id },
    });

    return NextResponse.json(flashcard);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
