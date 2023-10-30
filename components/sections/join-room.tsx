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
		message: "Room URL must be at least 4 characters."
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

			const { data, error } = await supabase
				.from("Room")
				.select("room_id")
				.eq("room_id", roomData.roomId)
				.single();

			if (error) {
				toast({
					title: "Room not found",
					description: "The room you are trying to join does not exist."
				});
			}

			if (data?.room_id === roomData.roomId) {
				router.push(`/app/r/${roomData.roomId}`);
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
										<Input placeholder="https://sync-tube-one.vercel.app/r/our-room" {...field} />
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
