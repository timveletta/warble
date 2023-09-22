import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Warble',
	description: 'Warble with other people around the world!',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={`container ${inter.className}`}>
					{children}
					<footer>
						<p className="text-xs text-center py-4">
							Not to be confused with any other bird sounding app.
						</p>
					</footer>
				</body>
			</html>
		</ClerkProvider>
	);
}
