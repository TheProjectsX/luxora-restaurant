import { NextRequest, NextResponse } from "next/server";
import { getPrismaErrorResponse } from "@/app/api/utils";
import prisma from "@/app/prismaClient/prisma";

const getContactMessagesResponse = async (page: number, limit: number) => {
    const contactMessages = await prisma.contactMessage.findMany({
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
        data: contactMessages,
        pagination,
    };
};

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";

    try {
        const response = await getContactMessagesResponse(
            Number(page),
            Number(limit)
        );
        return NextResponse.json(response);
    } catch (error) {
        const [errorResponse, status] = getPrismaErrorResponse(error);
        return NextResponse.json(errorResponse, status);
    }
}
