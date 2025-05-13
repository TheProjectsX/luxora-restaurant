import { getPrismaErrorResponse } from "@/app/api/utils";
import prisma from "@/app/prismaClient/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ tid: string }> }
) {
    const { tid } = await params;

    try {
        await prisma.testimonial.delete({ where: { id: Number(tid) } });

        return NextResponse.json({
            success: true,
            message: "Testimonial deleted successfully",
        });
    } catch (error) {
        const [errorResponse, status] = getPrismaErrorResponse(error);
        return NextResponse.json(errorResponse, status);
    }
}
