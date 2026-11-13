import { scalekit } from "@/lib/scalekit";

import { NextRequest, NextResponse } from "next/server";

// login jo dertails login cookie store seesio se wo cllabck me floder kreng usk ari denge

// login hone ke bad callbcal route me jaoge

export const GET = async (req:NextRequest) => {
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`
    const url = scalekit.getAuthorizationUrl(redirectUri)
    console.log(url);
    return NextResponse.redirect(url)
    
 
};