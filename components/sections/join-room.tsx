"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Loader2Icon } from "lucide-react";
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
				.select("room_id, users")
				.eq("room_id", roomData.roomId)
				.single();

			if (roomError) {
				toast({
					title: "Room not found",
					description: "The room you are trying to join does not exist."
				});
				return;
			}

			router.push(`/room/${data?.room_id}`);

			// const user = (await supabase.auth.getUser()).data.user;
			// const { data: userData, error: userError } = await supabase
			// 	.from("Users")
			// 	.select("id, username")
			// 	.eq("id", user?.id)
			// 	.single();

			// if (userError) {
			// 	console.error(userError);
			// 	return;
			// }

			// const users = data?.users || [];
			// const userExists = users.find((user: any) => user.id === userData?.id);

			// if (!userExists) {
			// 	const newUser = { id: user?.id, username: userData?.username };
			// 	const newUsers = [...users, newUser];

			// 	const { error: updateError } = await supabase
			// 		.from("Room")
			// 		.insert({ users: newUsers })
			// 		.eq("room_id", roomData.roomId);

			// 	if (updateError) {
			// 		console.error(updateError);
			// 		return;
			// 	}
			// }
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
						<Button className="w-full" type="submit" disabled={form.formState.isSubmitting}>
							{form.formState.isSubmitting ? (
								<Loader2Icon className="mr-2 h-4 w-4 animate-spin" size="sm" />
							) : (
								"Join Room"
							)}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default JoinRoom;
