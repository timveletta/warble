import { clerkClient } from '@clerk/nextjs';
import { Prisma } from '@prisma/client';
import React from 'react';
import Image from 'next/image';

type PostDisplayProps = Prisma.PostGetPayload<{}>;

const PostDisplay = async ({
	content,
	userId,
	createdAt,
}: PostDisplayProps) => {
	const user = await clerkClient.users.getUser(userId);

	return (
		<li className="flex gap-x-4 py-4 border-b last:border-b-0 border-gray-200 dark:border-slate-700">
			<Image
				width={32}
				height={32}
				src={user.imageUrl}
				alt="user-avatar"
				className="rounded-full w-8 h-8"
			/>
			<div className="flex flex-col gap-y-2">
				<p>{content}</p>
				<div className="opacity-40 text-sm font-medium">
					{createdAt.toLocaleString()}
				</div>
			</div>
		</li>
	);
};

export default PostDisplay;
