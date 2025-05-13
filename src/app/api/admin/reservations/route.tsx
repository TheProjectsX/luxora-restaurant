import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/prismaClient/prisma";
import { getPrismaErrorResponse, parseDate } from "@/app/api/utils";

// get all reservations
const getReservationsResponse = async (
    page: number,
    limit: number,
    date: string | null
) => {
    const parsedDate = date ? parseDate(date) : null;

    const filter = parsedDate
        ? {
              date: {
                  gte: parsedDate,
                  lt: new Date(parsedDate.getTime() + 86400000),
              },
          }
        : {};

    const reservations = await prisma.reservation.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: filter,
    });

    const total = await prisma.reservation.count({
        where: filter,
    });

    const totalPages = Math.ceil(total / Number(limit));

    const pagination = {
        total_pages: totalPages,
        limit: Number(limit),
        current_page: Number(page),
        has_next_page: Number(page) < totalPages,
    };

    return {
        success: true,
        data: reservations,
        pagination,
    };
};

// Get Request
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";

    const date = searchParams.get("date");

    try {
        const response = await getReservationsResponse(
            Number(page),
            Number(limit),
            date
        );

        return NextResponse.json(response);
    } catch (error) {
        const [errorResponse, status] = getPrismaErrorResponse(error);
        return NextResponse.json(errorResponse, status);
    }
}
