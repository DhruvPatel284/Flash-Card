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

// Disable caching for this API route
export const fetchCache = 'force-no-store';

export async function GET(req: Request) {
  try {
    const flashcards = await prismadb.flashcard.findMany();

    return NextResponse.json(flashcards);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


