import { Textarea } from "@/components/ui/textarea";
import { SendHorizonalIcon } from "lucide-react";

const RoomPage = ({ params }: { params: { slug: string } }) => {
	return (
		<div className="h-[100dvh]">
			{/* <div className="flex items-center justify-between">
				<h3>Vybes Cartel</h3>
				<h3>607337e1-180a-4837-a11a-aa211a7a646e</h3>
			</div> */}

			<div className="flex h-full w-full flex-col border lg:flex-row">
				<div className="h-[50%] w-full border bg-red-800 lg:h-full lg:w-[65%]"></div>
				<div className="flex h-[50%] w-full flex-1 flex-col border lg:h-full">
					<div className="flex-grow">Content above the Textarea</div>

					<div className="flex w-full items-center justify-between gap-x-2 border-t border-input">
						<Textarea
							className="min-h-0 resize-none border-none px-2 py-1 text-base ring-offset-0 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0"
							placeholder="Enter your message"
						/>
						<button className="mr-1">
							<SendHorizonalIcon className="h-6 w-6" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RoomPage;
