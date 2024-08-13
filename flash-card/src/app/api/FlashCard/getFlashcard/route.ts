// import prismadb from "@/lib/prismadb";
// import { NextResponse } from "next/server";

// export async function GET(req: Request) {
//   try {
//     const flashcards = await prismadb.flashcard.findMany();

//     return NextResponse.json(flashcards);
//   } catch (error) {
//     console.log(error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }

import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const flashcards = await prismadb.flashcard.findMany();

    const response = NextResponse.json(flashcards);
    response.headers.set('Cache-Control', 'no-store');

    return response;
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

