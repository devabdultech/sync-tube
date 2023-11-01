"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import * as z from "zod";

import { PlusIcon, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";

const FormSchema = z.object({
	room: z.string().toLowerCase().min(4, {
		message: "Room name must be at least 4 characters."
	})
});

const CreateRoom = () => {
	const router = useRouter();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema)
	});

	const onSubmit = async (roomData: z.infer<typeof FormSchema>) => {
		try {
			const supabase = createClientComponentClient();
			const room_id = uuidv4();
			const user = (await supabase.auth.getUser()).data.user;
			const { data: userData, error: userError } = await supabase
				.from("Users")
				.select("username, id")
				.eq("id", user?.id)
				.single();

			if (userError) {
				console.error(userError);
				return;
			}

			const { data, error } = await supabase.from("Room").upsert([
				{
					room_id,
					room_name: roomData.room,
					creator_id: userData?.id,
					creator_username: userData?.username
				}
			]);

			toast({
				title: "Room Created",
				description: "You have successfully created a room."
			});

			router.push(`room/${room_id}`);
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<Dialog>
			<DialogTrigger className="w-full">
				<Card className="h-[250px] w-full lg:w-[300px]">
					<CardContent className="flex h-full flex-col items-center justify-center">
						<PlusIcon />
						<h3 className="text-lg font-medium">Create Room</h3>
					</CardContent>
				</Card>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create Room</DialogTitle>
					<DialogDescription>Input the room details you want to create</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
						<FormField
							control={form.control}
							name="room"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Room Name</FormLabel>
									<FormControl>
										<Input placeholder="rawdogg talk" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button className="w-full" type="submit" disabled={form.formState.isSubmitting}>
							{form.formState.isSubmitting ? (
								<Loader2Icon className="mr-2 h-4 w-4 animate-spin" size="sm" />
							) : (
								"Create Room"
							)}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default CreateRoom;
