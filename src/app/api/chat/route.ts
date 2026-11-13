
import connectDb from "@/lib/db";
import Settings from "@/model/settings.model";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
    "Access-Control-Allow-Origin": "http://127.0.0.1:5500",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 204,
        headers: corsHeaders,
    });
}

export async function POST(req: NextRequest) {
    try {
        const { message, ownerId } = await req.json();

        if (!message || !ownerId) {
            return NextResponse.json(
                { message: "message and owner id is required" },
                { status: 400, headers: corsHeaders }
            );
        }

        await connectDb();

        const setting = await Settings.findOne({ ownerId });

        if (!setting) {
            return NextResponse.json(
                { message: "chat bot is not configured yet." },
                { status: 400, headers: corsHeaders }
            );
        }

        const KNOWLEDGE = `
        business name- ${setting.businessName || "not provided"}
        supportEmail- ${setting.supportEmail || "not provided"}
        knowledge- ${setting.knowledge || "not provided"}
        `;

        const prompt = `
You are a professional customer support assistant for this business.

Use ONLY the information provided below to answer the customer's question.
Do NOT invent new policies, prices, or promises.

BUSINESS INFORMATION:
${KNOWLEDGE}

CUSTOMER QUESTION:
${message}

ANSWER:
`;

        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY
        });

        const res = await ai.models.generateContent({
            model: "gemini-3.5-flash-lite",
            contents: prompt,
        });

        return NextResponse.json(
            { answer: res.text },
            { headers: corsHeaders }
        );

    } catch (error) {
        console.error("Chat API error:", error);

        return NextResponse.json(
            { message: "Something went wrong while processing chat." },
            { status: 500, headers: corsHeaders }
        );
    }
}
