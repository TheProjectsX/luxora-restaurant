import prisma from "@/app/prismaClient/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getPrismaErrorResponse } from "../../utils";

export async function POST(req: NextRequest) {
    const { title, image, category } = await req.json();

    try {
        const galleryImage = await prisma.galleryImage.create({
            data: { title, image, category },
        });

        return NextResponse.json({
            success: true,
            message: "Gallery image created successfully",
            id: galleryImage.id,
        });
    } catch (error) {
        const [errorResponse, status] = getPrismaErrorResponse(error);
        return NextResponse.json(errorResponse, status);
    }
}
