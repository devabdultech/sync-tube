import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import {
	MonitorPlayIcon,
	MessageCircleIcon,
	ShieldCheckIcon,
	AirplayIcon,
	SmilePlusIcon,
	ScanFaceIcon
} from "lucide-react";

const Features = () => {
	const features = [
		{
			title: "Real-Time Synchronized Streaming",
			icon: <MonitorPlayIcon size={32} />,
			description:
				"Watch videos with friends in real-time, with synchronized playback across all devices"
		},
		{
			title: "Integrated Chat Functionality",
			icon: <MessageCircleIcon size={32} />,
			description: "Chat with friends while watching videos together, all in one place"
		},
		{
			title: "Streaming from Various Sources",
			icon: <AirplayIcon size={32} />,
			description: "Stream videos from various sources, including YouTube, Vimeo, and more"
		},
		{
			title: "Reactions Integration",
			icon: <SmilePlusIcon size={32} />,
			description: "React to videos with emojis, and see your friends' reactions in real-time"
		},
		{
			title: "Customizable User Profiles",
			icon: <ScanFaceIcon size={32} />,
			description: "Customize your profile with a profile picture and username"
		},
		{
			title: "Secure and Private Rooms",
			icon: <ShieldCheckIcon size={32} />,
			description:
				"Create private rooms with password protection, ensuring that only invited guests can join"
		}
	];

	return (
		<section className="flex flex-col items-center justify-center p-5 text-center">
			<h3 className="text-xl font-semibold lg:text-2xl">What&rsquo;s in SyncTube?</h3>
			<div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{features.map((feature, index) => (
					<Card className="cursor-pointer" key={index}>
						<CardHeader className="flex flex-row items-center gap-2">
							{feature.icon}
							<CardTitle className="text-lg">{feature.title}</CardTitle>
						</CardHeader>
						<CardContent>
							<CardDescription className="mt-1 text-left text-base">
								{feature.description}
							</CardDescription>
						</CardContent>
					</Card>
				))}
			</div>
		</section>
	);
};

export default Features;
