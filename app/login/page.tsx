"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon, MonitorPlayIcon } from "lucide-react";
import UserAuthForm from "@/components/sections/user-auth-form";

const LoginPage = () => {
	const router = useRouter();

	return (
		<div className="flex w-full flex-col lg:flex-row">
			<section className="h-full min-h-screen w-full border-r p-10 lg:w-[40%]">
				<button onClick={() => router.back()} className="flex cursor-pointer items-center gap-1">
					<ChevronLeftIcon className="h-6 w-6" />
					Back
				</button>

				<div className="mt-12 flex flex-col gap-3">
					<Link href="/">
						<div className="flex items-center gap-2 text-xl font-semibold lg:text-2xl">
							<MonitorPlayIcon /> SyncTube
						</div>
					</Link>
					<p className="text-base text-muted-foreground">
						Turning Screens into Shared Experiences{" "}
					</p>
				</div>

				<div className="mt-10">
					<p className="mb-5 text-sm text-muted-foreground">
						Enter your email to sign in to your account
					</p>
					<UserAuthForm />
				</div>
			</section>
			<section className="hidden min-h-screen p-10 lg:block lg:flex-1">
				I am on the side also
			</section>
		</div>
	);
};

export default LoginPage;
