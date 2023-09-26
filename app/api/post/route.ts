import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function GET(request: Request) {
	const posts = await prisma.post.findMany({
		orderBy: {
			createdAt: 'desc',
		},
		take: 10,
	});
	return NextResponse.json(posts);
}

export async function POST(request: Request) {
	const { userId } = auth();
	const body: { content: string } = await request.json();

	const post = await prisma.post.create({
		data: {
			userId: userId!,
			content: body.content,
		},
	});

	revalidatePath('/');

	return NextResponse.json(post);
}
