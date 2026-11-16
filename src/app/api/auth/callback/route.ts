
import { scalekit } from "@/lib/scalekit";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`;

    if (!code) {
      return NextResponse.json(
        { message: "Code not found" },
        { status: 400 }
      );
    }

    const session = await scalekit.authenticateWithCode(
      code,
      redirectUri
    );

    if (!session.accessToken) {
      return NextResponse.json(
        { message: "Access token not received" },
        { status: 401 }
      );
    }

    const response = NextResponse.redirect(
      new URL("/", process.env.NEXT_PUBLIC_APP_URL)
    );

    response.cookies.set("access_token", session.accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Authentication callback error:", error);

    return NextResponse.json(
      { message: "Authentication failed" },
      { status: 500 }
    );
  }
};
