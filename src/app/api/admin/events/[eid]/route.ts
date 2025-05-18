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
    data.date = data.date ? new Date(data.date) : null;
    data.deadline = data.deadline ? new Date(data.deadline) : null;

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

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ eid: string }> }
) {
    const { eid } = await params;

    try {
        const event = await prisma.event.findUnique({
            where: { id: Number(eid) },
        });

        if (!event) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Event not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Event fetched successfully",
            data: event,
        });
    } catch (error) {
        const [errorResponse, status] = getPrismaErrorResponse(error);
        return NextResponse.json(errorResponse, status);
    }
}
