import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { deleteCardByTitle } from "@/lib/cards_queries";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { message: "authentication failed!" },
        { status: 404 }
      );
    }

    console.log("Authentication successful!");

    const cards = await prisma.card.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(cards);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "something went wrong!" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { message: "authentication failed!" },
        { status: 404 }
      );
    }

    console.log("Authentication successful!");

    const body = await req.json();
    const { title, content, type } = body;

    if (!title || !content || !type) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const card = await prisma.card.create({
      data: {
        title,
        content,
        type,               // <-- ADDED
        userId: session.user.id,
      },
    });

    return NextResponse.json(card, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "something went wrong!" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { message: "authentication failed!" },
        { status: 404 }
      );
    }

    console.log("Authentication successful!");

    const body = await req.json();
    const { id, title, content, type } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Card ID missing" },
        { status: 400 }
      );
    }

    const updated = await prisma.card.updateMany({
      where: {
        id,
        userId: session.user.id,
      },
      data: {
        title,
        content,
        type,         
      },
    });

    if (updated.count === 0) {
      return NextResponse.json(
        { error: "Not found or no permission" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "something went wrong!" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { message: "authentication failed!" },
        { status: 404 }
      );
    }

    console.log("Authentication successful!");

    const body = await req.json();
    const { title } = body;

    if (!title) {
      return NextResponse.json(
        { error: "Card title missing" },
        { status: 400 }
      );
    }

    // Use the new query
    const deleted = await deleteCardByTitle(title, session.user.id);

    if (!deleted || deleted.count === 0) {
      return NextResponse.json(
        { error: "Not found or no permission" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "something went wrong!" },
      { status: 500 }
    );
  }
}

