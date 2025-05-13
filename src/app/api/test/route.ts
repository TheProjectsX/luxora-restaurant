import { NextResponse } from "next/server";
import prisma from "../../prismaClient/prisma";
import { getPrismaErrorResponse } from "../utils";

export async function GET(req: Request) {
    return NextResponse.json(await prisma.testModel.findMany());
}

export async function POST(req: Request) {
    const { name } = await req.json();

    try {
        return NextResponse.json(
            await prisma.testModel.create({ data: { name } })
        );
    } catch (error) {
        const [errorResponse, status] = getPrismaErrorResponse(error);
        return NextResponse.json(errorResponse, status);
    }
}
