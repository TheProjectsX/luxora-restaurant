import { filterDefinedFields, getPrismaErrorResponse } from "@/app/api/utils";
import prisma from "@/app/prismaClient/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ eid: string }> }
) {
    const { eid } = await params;

    try {
        await prisma.event.delete({ where: { id: Number(eid) } });
        return NextResponse.json({
            success: true,
            message: "Event deleted successfully",
        });
    } catch (error) {
        const [errorResponse, status] = getPrismaErrorResponse(error);
        return NextResponse.json(errorResponse, status);
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ eid: string }> }
) {
    const { eid } = await params;

    const body = await req.json();
    const data = filterDefinedFields(body);

    try {
        const event = await prisma.event.update({
            where: { id: Number(eid) },
            data: data,
        });

        return NextResponse.json({
            success: true,
            message: "Event updated successfully",
            id: event.id,
        });
    } catch (error) {
        const [errorResponse, status] = getPrismaErrorResponse(error);
        return NextResponse.json(errorResponse, status);
    }
}
