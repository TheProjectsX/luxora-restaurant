import prisma from "@/app/prismaClient/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getPrismaErrorResponse } from "../../utils";

export async function POST(req: NextRequest) {
    const { name, description, date, deadline, location, banner } =
        await req.json();

    try {
        const event = await prisma.event.create({
            data: {
                name,
                description,
                date: date ? new Date(date) : null,
                deadline: deadline ? new Date(deadline) : null,
                location,
                banner,
            },
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
