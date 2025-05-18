import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/prismaClient/prisma";

// Get all messages
const getMessagesResponse = async (page: number, limit: number) => {
    const messages = await prisma.contactMessage.findMany({
        skip: (page - 1) * limit,
        take: limit,
    });

    const total = await prisma.contactMessage.count();

    const totalPages = Math.ceil(total / Number(limit));

    const pagination = {
        total_pages: totalPages,
        limit: Number(limit),
        current_page: Number(page),
    };

    return {
        success: true,
        data: messages,
        pagination,
    };
};

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";

    const messages = await getMessagesResponse(Number(page), Number(limit));
    return NextResponse.json(messages);
}
