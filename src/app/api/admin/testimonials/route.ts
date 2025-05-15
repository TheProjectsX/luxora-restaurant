import prisma from "@/app/prismaClient/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getPrismaErrorResponse } from "@/app/api/utils";

export async function POST(req: NextRequest) {
    const { name, review, rating } = await req.json();

    try {
        const testimonial = await prisma.testimonial.create({
            data: { name, review, rating },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Testimonial created successfully",
                id: testimonial.id,
            },
            { status: 201 }
        );
    } catch (error) {
        const [errorResponse, status] = getPrismaErrorResponse(error);
        return NextResponse.json(errorResponse, status);
    }
}
