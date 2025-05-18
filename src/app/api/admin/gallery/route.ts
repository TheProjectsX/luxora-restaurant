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

// Get gallery images
const getGalleryResponse = async (page: number, limit: number) => {
    const gallery = await prisma.galleryImage.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
            createdAt: "desc",
        },
    });

    const total = await prisma.galleryImage.count();

    const totalPages = Math.ceil(total / Number(limit));

    const pagination = {
        total_pages: totalPages,
        limit: Number(limit),
        current_page: Number(page),
        has_next_page: Number(page) < totalPages,
    };

    return {
        success: true,
        data: gallery,
        pagination,
    };
};

// Get Request
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";

    try {
        const response = await getGalleryResponse(Number(page), Number(limit));
        return NextResponse.json(response);
    } catch (error) {
        const [errorResponse, status] = getPrismaErrorResponse(error);
        return NextResponse.json(errorResponse, status);
    }
}
