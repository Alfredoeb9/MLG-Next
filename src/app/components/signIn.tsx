"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        signIn("email", { email, callbackUrl: "/me" });

    }
    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-between p-24">
			<div className="space-y-2">
				<label htmlFor="email">Email</label>
				<input
					id="email"
					name="email"
					placeholder="johndoes@example.com"
					required
					type="email"
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<button
				disabled={loading}
				className="bg-zinc-900 py-2 text-zinc-100 shadow hover:bg-zinc/90 w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
				type="submit"
			>
				Send me a magic link
			</button>
		</form>
    )
}