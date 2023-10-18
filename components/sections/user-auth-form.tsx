"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
	email: z.string().email({
		message: "Please enter a valid email address"
	})
});

const UserAuthForm = () => {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema)
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		toast({
			title: "You submitted the following values:",
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			)
		});
	}

	return (
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
				<Button className="w-full" type="submit">
					Sign In with Email
				</Button>
			</form>
		</Form>
	);
};

export default UserAuthForm;
