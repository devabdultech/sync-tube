"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";

const App = () => {
	const supabase = createClientComponentClient();
	const router = useRouter();
	const [userData, setUserData] = useState<null | User>(null);

	useEffect(() => {
		const fetchUserData = async () => {
			const {
				data: { user }
			} = await supabase.auth.getUser();
			setUserData(user);
		};

		fetchUserData();
	}, [supabase.auth]);

	return (
		<div>
			<h3>App</h3>
			<p>Welcome {userData && userData.email}</p>
			<Button
				onClick={async () => {
					await supabase.auth.signOut();
					router.push("/");
				}}
			>
				Sign Out
			</Button>
		</div>
	);
};

export default App;
