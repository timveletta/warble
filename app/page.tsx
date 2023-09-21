import { UserButton, currentUser } from '@clerk/nextjs';
import type { User } from '@clerk/nextjs/api';
import Link from 'next/link';

export default async function Home() {
	const user: User | null = await currentUser();

	return (
		<main>
			<nav className="w-full flex justify-between gap-x-2 py-2">
				<Link className="text-lg font-bold" href="/">
					Warble
				</Link>
				<div className="flex gap-x-2">
					{user === null && (
						<>
							<Link
								href="/sign-in"
								className="p-2 bg-blue-800 text-white rounded-md hover:bg-blue-900"
							>
								Sign In
							</Link>
							<Link
								href="/sign-up"
								className="p-2 bg-blue-800 text-white rounded-md hover:bg-blue-900"
							>
								Sign Up
							</Link>
						</>
					)}
					<UserButton afterSignOutUrl="/" />
				</div>
			</nav>
		</main>
	);
}
