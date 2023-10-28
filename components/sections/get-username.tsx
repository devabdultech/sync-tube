"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import * as z from "zod";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Loader2Icon } from "lucide-react";

const FormSchema = z.object({
	username: z
		.string()
		.min(4, { message: "Username must be 4 characters or more" })
		.refine(
			(value) => {
				return /^[a-zA-Z0-9_]+$/.test(value);
			},
			{ message: "Please enter a valid username" }
		)
});

const GetUsername = ({
	dOpen,
	userId,
	userEmail,
	onClose
}: {
	dOpen: boolean;
	userId: string | undefined;
	userEmail: string | undefined;
	onClose: () => void;
}) => {
	const router = useRouter();
	const supabase = createClientComponentClient();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema)
	});

	const submitUsername = async (username: string) => {
		const { data, error } = await supabase.from("Users").select("id").eq("username", username);
		if (data && data.length > 0) {
			throw new Error(
				"Username not available, This username is already taken. Please try another one."
			);
		} else {
			await supabase.from("Users").upsert([
				{
					id: userId,
					email: userEmail,
					username
				}
			]);
		}
	};

	const onSubmit = async (data: z.infer<typeof FormSchema>) => {
		try {
			await submitUsername(data.username);

			toast({
				title: "Username set",
				description: "You have successfully set your username."
			});

			onClose();

			window.location.reload();
		} catch (error: any) {
			toast({
				title: "Username not set",
				description: error.message,
				variant: "destructive"
			});
		}
	};

	return (
		<div className="flex w-full flex-col space-y-4">
			<Dialog open={dOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Input Username</DialogTitle>
						<DialogDescription>Input your preferred Username</DialogDescription>
					</DialogHeader>

					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
							<FormField
								control={form.control}
								name="username"
								render={({ field }: { field: any }) => (
									<FormItem>
										<FormControl>
											<Input placeholder="abdultech" {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<DialogFooter>
								<Button className="w-full" type="submit" disabled={form.formState.isSubmitting}>
									{form.formState.isSubmitting ? (
										<Loader2Icon className="mr-2 h-4 w-4 animate-spin" size="sm" />
									) : (
										"Submit Username"
									)}
								</Button>
							</DialogFooter>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default GetUsername;
