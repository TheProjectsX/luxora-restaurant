import { NextRequest, NextResponse } from "next/server";
import { getPrismaErrorResponse } from "@/app/api/utils";
import prisma from "@/app/prismaClient/prisma";

const getBookedDatesResponse = async () => {
    const bookedDates = await prisma.reservation.findMany({
        select: {
            date: true,
        },
    });

    return {
        success: true,
        data: bookedDates,
    };
};

export async function GET(req: NextRequest) {
    try {
        const response = await getBookedDatesResponse();
        return NextResponse.json(response);
    } catch (error) {
        const [errorResponse, status] = getPrismaErrorResponse(error);
        return NextResponse.json(errorResponse, status);
    }
}
