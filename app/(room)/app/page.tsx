"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@supabase/auth-helpers-nextjs";

const App = () => {
	const supabase = createClientComponentClient();
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
		</div>
	);
};

export default App;