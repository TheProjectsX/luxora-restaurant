import prisma from "@/app/prismaClient/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getPrismaErrorResponse } from "@/app/api/utils";

export async function POST(req: NextRequest) {
    const { name, email, phone, date, guests } = await req.json();

    try {
        const reservation = await prisma.reservation.create({
            data: { name, email, phone, date: new Date(date), guests },
        });

        return NextResponse.json({
            success: true,
            message: "Reservation created successfully",
            data: reservation,
        });
    } catch (error) {
        const [errorResponse, status] = getPrismaErrorResponse(error);
        return NextResponse.json(errorResponse, status);
    }
}
