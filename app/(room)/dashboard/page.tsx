"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@supabase/auth-helpers-nextjs";
import Loading from "@/components/sections/loading";
import CreateRoom from "@/components/sections/create-room";
import JoinRoom from "@/components/sections/join-room";
import Room from "@/components/sections/room";
import GetUsername from "@/components/sections/get-username";
import { extractDateFromTimestamp } from "@/lib/utils";

interface Rooms {
	room_id: string;
	room_name: string;
	created_at: string;
}

const App = () => {
	const supabase = createClientComponentClient();
	const [userData, setUserData] = useState<null | User>(null);
	const [username, setUsername] = useState<string | null>(null);
	const [rooms, setRooms] = useState<Rooms[]>([]);
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

			const getRooms = await supabase
				.from("Room")
				.select("*")
				.eq("creator_id", user?.id);

			if (getUserData.data?.length === 0) {
				setOpenDialog(true);
			}

			const fetchedUsername = getUserData.data?.[0]?.username;
			setUsername(fetchedUsername);
			setUserData(user);
			setRooms((getRooms.data as Rooms[]) || []);
			console.log(rooms);
			setLoading(false);
		};

		fetchUserData();
	}, [supabase, supabase.auth, rooms]);

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
				{rooms.map((room) => (
					<Room
						key={room.room_id}
						roomId={room.room_id}
						roomName={room.room_name}
						createdAt={extractDateFromTimestamp(room.created_at)}
					/>
				))}
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
