import prisma from "@/app/prismaClient/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getPrismaErrorResponse } from "../../utils";

export async function POST(req: NextRequest) {
    const { name, description, date, location, banner } = await req.json();

    try {
        const event = await prisma.event.create({
            data: { name, description, date: new Date(date), location, banner },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Event created successfully",
                id: event.id,
            },
            { status: 201 }
        );
    } catch (error) {
        const [errorResponse, status] = getPrismaErrorResponse(error);
        return NextResponse.json(errorResponse, status);
    }
}
