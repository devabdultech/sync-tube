import { NextResponse } from "next/server";
import { Server, Socket } from "socket.io";

export async function GET(request: Request) {
  return NextResponse.json("Hello World!");
}
