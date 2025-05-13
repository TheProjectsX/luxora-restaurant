import { NextResponse } from "next/server";
import prisma from "../../prismaClient/prisma";

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
        if (error.name === "PrismaClientValidationError") {
            return NextResponse.json(
                { error: "Invalid Body" },
                { status: 400 }
            );
        } else if (error.name === "PrismaClientKnownRequestError") {
            return NextResponse.json(
                { error: "Invalid Body" },
                { status: 400 }
            );
        } else {
            return NextResponse.json(
                { error: "Unknown Error" },
                { status: 500 }
            );
        }
    }
}
