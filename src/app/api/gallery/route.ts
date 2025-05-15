import { NextRequest, NextResponse } from "next/server";
import { getPrismaErrorResponse } from "@/app/api/utils";
import prisma from "@/app/prismaClient/prisma";

const getGalleryResponse = async (page: number, limit: number) => {
    const gallery = await prisma.galleryImage.findMany({
        skip: (page - 1) * limit,
        take: limit,
    });

    const categorizedGallery = gallery.reduce((acc, image) => {
        const { category } = image;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(image);
        return acc;
    }, {});

    const filteredGallery = Object.keys(categorizedGallery).map((category) => ({
        category,
        images: categorizedGallery[category],
    }));

    return {
        success: true,
        data: filteredGallery,
    };
};

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
