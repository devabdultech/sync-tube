import { Textarea } from "@/components/ui/textarea";

const RoomPage = ({ params }: { params: { slug: string } }) => {
	return (
		<div className="h-[100dvh]">
			{/* <div className="flex items-center justify-between">
				<h3>Vybes Cartel</h3>
				<h3>607337e1-180a-4837-a11a-aa211a7a646e</h3>
			</div> */}

			<div className="flex h-full w-full border">
				<div className="w-[65%] border"></div>
				<div className="flex flex-1 flex-col border">
					<div></div>
					<Textarea className="relative top-0" placeholder="Enter your message" />
				</div>
			</div>
		</div>
	);
};

export default RoomPage;
