"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@supabase/auth-helpers-nextjs";
import { PlusCircleIcon } from "lucide-react";
import Loading from "@/components/sections/loading";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter
} from "@/components/ui/dialog";
import CreateRoom from "@/components/sections/create-room";
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

				<Dialog>
					<DialogTrigger className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
						<PlusCircleIcon className="mr-2 h-4 w-4" /> Join Room
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Join Room</DialogTitle>
							<DialogDescription>Input the room url you want to join</DialogDescription>
						</DialogHeader>

						<div className="grid gap-4 py-4">
							<div className="grid gap-2">
								<Label htmlFor="url">Room URL</Label>
								<Input id="url" placeholder="https://sync-tube.com/our-room" />
							</div>
						</div>
						<DialogFooter>
							<Button>Join Room</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>

			<div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
				<CreateRoom />
				<Room />
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
