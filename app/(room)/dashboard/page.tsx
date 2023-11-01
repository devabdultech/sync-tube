"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@supabase/auth-helpers-nextjs";
import Loading from "@/components/sections/loading";
import CreateRoom from "@/components/sections/create-room";
import JoinRoom from "@/components/sections/join-room";
import Room from "@/components/sections/room";
import GetUsername from "@/components/sections/get-username";

const App = () => {
	const supabase = createClientComponentClient();
	const [userData, setUserData] = useState<null | User>(null);
	const [username, setUsername] = useState<string | null>(null);
	const [openDialog, setOpenDialog] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUserData = async () => {
			const {
				data: { user }
			} = await supabase.auth.getUser();

			const getUserData = await supabase
				.from("Users")
				.select("username, id")
				.eq("email", user?.email);

			if (getUserData.data?.length === 0) {
				setOpenDialog(true);
			}

			const fetchedUsername = getUserData.data?.[0]?.username;
			setUsername(fetchedUsername);
			setUserData(user);
			setLoading(false);
		};

		fetchUserData();
	}, [supabase, supabase.auth]);

	if (loading) {
		return <Loading />;
	}

	return (
		<div className="p-5">
			<p>Welcome {username}</p>

			<div className="mt-8 flex items-center justify-between">
				<h3 className="text-lg font-semibold">Rooms</h3>

				<JoinRoom />
			</div>

			<div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
				<CreateRoom />
				<Room roomName="" createdAt="" />
			</div>

			<GetUsername
				dOpen={openDialog}
				userId={userData?.id}
				userEmail={userData?.email}
				onClose={() => {
					setOpenDialog(false);
				}}
			/>
		</div>
	);
};

export default App;
