import prisma from "@/app/prismaClient/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getPrismaErrorResponse } from "@/app/api/utils";

const getMenuResponse = async (page: number, limit: number) => {
    const dishes = await prisma.dish.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
            createdAt: "desc",
        },
    });

    const total = await prisma.dish.count();

    const totalPages = Math.ceil(total / Number(limit));

    const pagination = {
        total_pages: totalPages,
        limit: Number(limit),
        current_page: Number(page),
        has_next_page: Number(page) < totalPages,
    };

    return {
        success: true,
        data: dishes,
        pagination,
    };
};

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";

    try {
        const response = await getMenuResponse(Number(page), Number(limit));
        return NextResponse.json(response);
    } catch (error) {
        const [errorResponse, status] = getPrismaErrorResponse(error);
        return NextResponse.json(errorResponse, status);
    }
}
