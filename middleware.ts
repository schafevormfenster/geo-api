import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/api/", "/api/findbyaddress"],
};

export function middleware(req: NextRequest) {
  const token = req.headers.get("Sheep-Token");
  const url = req.nextUrl;
  const allowedTokens: String[] = process.env.ALLOWED_TOKENS?.split(",").map(
    (t) => t.trim()
  ) || ["Bääääh"];

  if (token && allowedTokens.includes(token)) {
    return NextResponse.next();
  }

  url.pathname = "/401";
  return NextResponse.redirect(url);
}
