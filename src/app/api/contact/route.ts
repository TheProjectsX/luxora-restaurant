import { NextRequest, NextResponse } from "next/server";
import { getPrismaErrorResponse } from "@/app/api/utils";
import prisma from "@/app/prismaClient/prisma";

export async function POST(req: NextRequest) {
    const { name, email, message } = await req.json();

    try {
        const contactMessage = await prisma.contactMessage.create({
            data: { name, email, message },
        });

        return NextResponse.json({
            success: true,
            message: "Message sent successfully",
            data: contactMessage,
        });
    } catch (error) {
        const [errorResponse, status] = getPrismaErrorResponse(error);
        return NextResponse.json(errorResponse, status);
    }
}
