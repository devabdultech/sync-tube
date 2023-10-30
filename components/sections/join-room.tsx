"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter
} from "@/components/ui/dialog";
import { PlusCircleIcon } from "lucide-react";

const FormSchema = z.object({
	roomId: z.string().uuid({
		message: "Room ID must be a valid UUID"
	})
});

const JoinRoom = () => {
	const router = useRouter();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema)
	});

	const onSubmit = async (roomData: z.infer<typeof FormSchema>) => {
		try {
			const supabase = createClientComponentClient();

			const { data, error: roomError } = await supabase
				.from("Room")
				.select("room_id")
				.eq("room_id", roomData.roomId)
				.single();

			const user = (await supabase.auth.getUser()).data.user;
			const { data: userData, error: userError } = await supabase
				.from("Users")
				.select("id, username")
				.eq("id", user?.id)
				.single();

			if (roomError) {
				toast({
					title: "Room not found",
					description: "The room you are trying to join does not exist."
				});
			}

			if (data && userData && data.room_id === roomData.roomId) {
				// Fetch the current users array from the Room table
				const { data: currentRoomData, error: roomError } = await supabase
					.from("Room")
					.select("users")
					.eq("room_id", roomData.roomId)
					.single();

				if (roomError) {
					console.error(roomError);
					return;
				}

				// Get the existing users array or initialize it as an empty array
				const currentUsers = currentRoomData?.users || [];

				const newUser = {
					userId: userData?.id,
					username: userData?.username
				};

				// Append the new user to the existing users array
				const updatedUsers = [...currentUsers, newUser];

				// Update the 'users' column with the updated JSON data
				const { error: updateError } = await supabase
					.from("Room")
					.update({ users: updatedUsers })
					.eq("room_id", roomData.roomId);

				if (updateError) {
					console.error(updateError);
				} else {
					router.push(`/app/r/${roomData.roomId}`);
				}
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Dialog>
			<DialogTrigger className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
				<PlusCircleIcon className="mr-2 h-4 w-4" /> Join Room
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Join Room</DialogTitle>
					<DialogDescription>Input the room ID you want to join</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
						<FormField
							control={form.control}
							name="roomId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Room ID</FormLabel>
									<FormControl>
										<Input placeholder="607337e1-180a-4837-a11a-aa211a7a646e" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit">Join Room</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default JoinRoom;
