'use client';
import React from 'react';

const WarbleForm = () => {
	const [error, setError] = React.useState<string | null>(null);

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError(null);

		const target = event.currentTarget;

		const response = await fetch('/api/post', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				content: target.content.value,
			}),
		});

		const json = await response.json();
		if (!response.ok) {
			setError(json.message);
		} else {
			target.reset();
		}
	};

	return (
		<form className="flex flex-col gap-y-2" onSubmit={onSubmit}>
			<div className="flex flex-col gap-y-2">
				<label htmlFor="content" className="text-sm font-bold">
					What would you like to Warble about?
				</label>
				<textarea
					id="content"
					name="content"
					required
					rows={3}
					maxLength={200}
					className="dark:bg-slate-800 rounded-lg p-4 text-lg resize-none"
				/>
			</div>
			<div className="flex justify-between">
				<p className="text-sm text-red-700">{error}</p>
				<button
					className="py-2 px-3 bg-blue-800 text-white rounded-md hover:bg-blue-900"
					type="submit"
				>
					Warble!
				</button>
			</div>
		</form>
	);
};

export default WarbleForm;
