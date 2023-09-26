import { UserButton, auth, currentUser } from '@clerk/nextjs';
import type { User } from '@clerk/nextjs/api';
import Link from 'next/link';
import WarbleForm from './warble-form';
import PostDisplay from './post-display';

export default async function Home() {
	const user: User | null = await currentUser();
	const posts = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/post`
	).then((res) => res.json());

	return (
		<>
			<nav className="w-full flex justify-between gap-x-2 py-2">
				<Link className="text-lg font-bold" href="/">
					Warble
				</Link>
				<div className="flex gap-x-2">
					{user === null && (
						<>
							<Link
								href="/sign-in"
								className="py-2 px-3 bg-blue-800 text-white rounded-md hover:bg-blue-900"
							>
								Sign In
							</Link>
							<Link
								href="/sign-up"
								className="py-2 px-3 bg-blue-800 text-white rounded-md hover:bg-blue-900"
							>
								Sign Up
							</Link>
						</>
					)}
					<UserButton afterSignOutUrl="/" />
				</div>
			</nav>
			<main>
				{user !== null && <WarbleForm />}
				<ul className="flex flex-col gap-y-2 my-4 bg-white dark:bg-slate-800 rounded-lg shadow-md p-4">
					{posts.map((post) => (
						<PostDisplay key={post.id} {...post} />
					))}
				</ul>
			</main>
		</>
	);
}
