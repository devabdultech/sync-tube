"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@supabase/auth-helpers-nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { MonitorPlayIcon, User2Icon, LogOutIcon, BrushIcon, Moon, Sun } from "lucide-react";

const RoomNavbar = () => {
	const supabase = createClientComponentClient();
	const router = useRouter();
	const { setTheme, theme } = useTheme();
	const [username, setUsername] = useState<string | null>(null);
	const [userData, setUserData] = useState<null | User>(null);

	useEffect(() => {
		const fetchUserData = async () => {
			const {
				data: { user }
			} = await supabase.auth.getUser();

			const getUserData = await supabase
				.from("Users")
				.select("username, id")
				.eq("email", user?.email);

			const fetchedUsername = getUserData.data?.[0]?.username;
			setUsername(fetchedUsername);
			setUserData(user);
		};

		fetchUserData();
	}, [supabase.auth, supabase]);

	return (
		<header className="flex w-full items-center justify-between border-b px-5 py-2 shadow-md">
			<Link href="/">
				<div className="flex items-center gap-2 font-semibold lg:text-xl">
					<MonitorPlayIcon /> SyncTube
				</div>
			</Link>

			<DropdownMenu>
				<DropdownMenuTrigger>
					<Avatar>
						<AvatarImage src="https://github.com/shadcn.png" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel className="cursor-pointer">
						<Link href="/app/profile">
							<p className="text-base">{username}</p>
							<p className="mt-1 text-muted-foreground">{userData && userData.email}</p>
						</Link>
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem className="cursor-pointer">
						<Link className="flex cursor-pointer items-center gap-2" href="/app/profile">
							<User2Icon /> Profile
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem className="flex cursor-pointer items-center justify-between">
						<div className="flex items-center gap-2">
							<BrushIcon /> Theme
						</div>

						{theme === "light" ? (
							<Moon className="cursor-pointer" onClick={() => setTheme("dark")} />
						) : (
							<Sun className="cursor-pointer" onClick={() => setTheme("light")} />
						)}
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={async () => {
							supabase.auth.signOut();
							router.push("/");
						}}
						className="flex cursor-pointer items-center gap-2"
					>
						<LogOutIcon /> Logout
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</header>
	);
};

export default RoomNavbar;
