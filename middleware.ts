import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.headers.get("Sheep-Token");
  const url = req.nextUrl;

  if (token) {
    if (token === "Bääääh") {
      return NextResponse.next();
    }
  }
  url.pathname = "/api-doc";
  return NextResponse.rewrite(url);
}
