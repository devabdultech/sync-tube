"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { MonitorPlayIcon, MenuIcon, Moon, Sun } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
	const { setTheme } = useTheme();

	return (
		<header className="flex w-full items-center justify-between px-5 py-3">
			<Link href="/">
				<div className="flex items-center gap-2 font-semibold lg:text-xl">
					<MonitorPlayIcon /> SyncTube
				</div>
			</Link>

			<Sheet>
				<SheetTrigger className="block lg:hidden">
					<MenuIcon />
				</SheetTrigger>
				<SheetContent>
					<div className="mt-8 flex flex-col gap-4">
						<Button className="w-full">Login</Button>

						<div className="flex w-full items-center justify-between">
							<Button onClick={() => setTheme("light")}>Light</Button>
							<Button onClick={() => setTheme("dark")}>Dark</Button>
							<Button onClick={() => setTheme("system")}>System</Button>
						</div>
					</div>
				</SheetContent>
			</Sheet>

			<div className="hidden items-center gap-3 lg:flex">
				<Button className="">Login</Button>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" size="icon">
							<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
							<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
							<span className="sr-only">Toggle theme</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
};

export default Navbar;
