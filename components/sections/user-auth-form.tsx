"use client";

import { useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { Loader2Icon } from "lucide-react";

const FormSchema = z.object({
	email: z.string().email({
		message: "Please enter a valid email address"
	})
});

const UserAuthForm = () => {
	const router = useRouter();
	const supabase = createClientComponentClient();
	const [showDialog, setShowDialog] = useState(false);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema)
	});

	const handleSignInWithEmail = async (email: string) => {
		await supabase.auth.signInWithOtp({
			email,
			options: {
				emailRedirectTo: `${location.origin}/app`
			}
		});
	};

	const handleSignInWithGoogle = async () => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: {
				queryParams: {
					access_type: "offline",
					prompt: "consent"
				},
				redirectTo: `${location.origin}/app`
			}
		});
	};

	const onSubmit = async (data: z.infer<typeof FormSchema>) => {
		try {
			await handleSignInWithEmail(data.email);

			toast({
				title: "Check your email",
				description:
					"We have sent you a login link. Please check your email (including spam folder) to complete the sign in process."
			});
		} catch (error: any) {
			toast({
				title: "Sign in failed",
				description: error.message,
				variant: "destructive"
			});
		}
	};

	return (
		<div className="flex w-full flex-col space-y-4">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
					<FormField
						control={form.control}
						name="email"
						render={({ field }: { field: any }) => (
							<FormItem>
								<FormControl>
									<Input placeholder="johndoe@example.com" {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<Button className="w-full" type="submit" disabled={form.formState.isSubmitting}>
						{form.formState.isSubmitting ? (
							<Loader2Icon className="mr-2 h-4 w-4 animate-spin" size="sm" />
						) : (
							"Sign In with Email"
						)}
					</Button>
				</form>
			</Form>

			<div className="flex items-center justify-center">
				<hr className="flex-grow border-gray-300" />
				<h3 className="mx-4 text-sm uppercase text-muted-foreground">or continue with</h3>
				<hr className="flex-grow border-gray-300" />
			</div>

			<Button onClick={() => handleSignInWithGoogle()} variant={"outline"} className="w-full">
				<div className="flex items-center justify-center gap-2">
					<Image
						src="https://cdn.simpleicons.org/google"
						alt="Google Logo"
						width={15}
						height={15}
						className=""
					/>
					<span>Sign In with Google</span>
				</div>
			</Button>
		</div>
	);
};

export default UserAuthForm;
