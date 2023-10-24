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

import { MonitorPlayIcon, User2Icon, LogOutIcon, BrushIcon, Moon, Sun, Laptop2Icon } from "lucide-react";

const RoomNavbar = () => {
	const supabase = createClientComponentClient();
	const router = useRouter();
	const { setTheme } = useTheme();
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
		<header className="flex w-full items-center justify-between p-5">
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
							<p className="text-base">Abdulhameed</p>
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
                        <div className="flex justify-between items-center gap-2">
                            <Sun className="cursor-pointer" onClick={() => setTheme("light")} />
                            <Moon className="cursor-pointer" onClick={() => setTheme("dark")} />
                            <Laptop2Icon className="cursor-pointer" onClick={() => setTheme("system")} />
                        </div>
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
