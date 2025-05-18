import { NextRequest, NextResponse } from "next/server";
import { getPrismaErrorResponse } from "@/app/api/utils";
import prisma from "@/app/prismaClient/prisma";

const getGalleryResponse = async () => {
    const gallery = await prisma.galleryImage.findMany({
        orderBy: {
            createdAt: "desc",
        },
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
    try {
        const response = await getGalleryResponse();
        return NextResponse.json(response);
    } catch (error) {
        const [errorResponse, status] = getPrismaErrorResponse(error);
        return NextResponse.json(errorResponse, status);
    }
}
