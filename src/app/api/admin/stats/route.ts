import { NextRequest, NextResponse } from "next/server";
import { getPrismaErrorResponse } from "@/app/api/utils";
import prisma from "@/app/prismaClient/prisma";

const getStatsResponse = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Adjust so Saturday is the first day
    const startOfWeek = new Date(today);
    const daysToSubtract = (today.getDay() + 1) % 7;
    startOfWeek.setDate(today.getDate() - daysToSubtract);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    // Get all stats in parallel
    const [
        totalReservations,
        todayReservations,
        weekReservations,
        totalMenuItems,
    ] = await Promise.all([
        // Total reservations
        prisma.reservation.count(),

        // Today's reservations
        prisma.reservation.count({
            where: {
                date: {
                    gte: today.toISOString(),
                    lt: new Date(
                        today.getTime() + 24 * 60 * 60 * 1000
                    ).toISOString(),
                },
            },
        }),

        // This week's reservations (Saturday to Friday)
        prisma.reservation.count({
            where: {
                date: {
                    gte: startOfWeek.toISOString(),
                    lte: endOfWeek.toISOString(),
                },
            },
        }),

        // Total menu items
        prisma.dish.count(),
    ]);

    return {
        success: true,
        data: {
            total_reservations: totalReservations,
            today_reservations: todayReservations,
            week_reservations: weekReservations,
            total_menu_items: totalMenuItems,
        },
    };
};

export async function GET(req: NextRequest) {
    try {
        const response = await getStatsResponse();
        return NextResponse.json(response);
    } catch (error) {
        const [errorResponse, status] = getPrismaErrorResponse(error);
        return NextResponse.json(errorResponse, status);
    }
}
