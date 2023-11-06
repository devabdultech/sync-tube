import { Input } from "@/components/ui/input";
import { SendHorizonalIcon } from "lucide-react";

const VideoCanvas = () => {
	return (
		<div className="flex h-[50%] w-full flex-col lg:h-full lg:w-[65%]">
			<div className="flex h-[40px] items-center border-b">
				<div className="min-w-fit appearance-none border-none bg-primary-foreground p-2">
					<h3 className="mb-0 appearance-none ">Now Watching:</h3>
				</div>
				<Input
					className="h-full rounded-none border-none text-base ring-offset-0 placeholder:text-ellipsis focus:caret-indigo-500 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0"
					placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
				/>
				<button className="mx-2">
					<SendHorizonalIcon className="h-6 w-6" />
				</button>
			</div>

			<div className="flex-1">Video Playing...</div>
		</div>
	);
};

export default VideoCanvas;
