import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth } from '@clerk/nextjs';
import { revalidateTag } from 'next/cache';

const prisma = new PrismaClient();

export async function POST(request: Request) {
	const { userId } = auth();
	const body: { content: string } = await request.json();

	const post = await prisma.post.create({
		data: {
			userId: userId!,
			content: body.content,
		},
	});

	revalidateTag('posts');

	return NextResponse.json(post);
}
