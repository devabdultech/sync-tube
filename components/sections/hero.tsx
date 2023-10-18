import { Button } from "@/components/ui/button";

const Hero = () => {
	return (
		<section className="flex flex-col items-center justify-center px-5 py-20 text-center">
			<h1 className="text-xl font-semibold lg:text-2xl">
				SyncTube: Watching Together, No Matter the Distance
			</h1>

			<p className="mt-4 text-base">
				SyncTube is your ultimate platform for synchronized video streaming and chat with friends.
				Share the excitement in real-time.
			</p>

			<div className="mt-6">
				<Button className="mr-4">Start watching</Button>
				<Button variant="outline">Learn More</Button>
			</div>
		</section>
	);
};

export default Hero;
