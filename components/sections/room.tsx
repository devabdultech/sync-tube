import Link from "next/link";
import { useCopyToClipboard } from "@/hooks/copy";
import { useToast } from "@/components/ui/use-toast";
import { MousePointerSquareIcon } from "lucide-react";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger
} from "@/components/ui/context-menu";

interface Room {
	roomId: string;
	roomName: string;
	createdAt: string;
}
const Room = ({ roomId, roomName, createdAt }: Room) => {
	const { toast } = useToast();
	const [value, copy] = useCopyToClipboard();

	const handleCopyRoomId = () => {
		copy(roomId);
		toast({
			title: "Copied",
			description: "Successfully Copied Room ID"
		});
	};

	const handleCopyRoomLink = () => {
		copy(`${window.location.origin}/room/${roomId}`);
		toast({
			title: "Copied",
			description: "Successfully Copied Room Link"
		});
	};
	return (
		<ContextMenu>
			<ContextMenuTrigger>
				<Link href={`/room/${roomId}`}>
					<Card className="flex h-[250px] w-full flex-col justify-between lg:w-[300px]">
						<CardHeader>
							<CardTitle className="flex items-center text-lg">
								<MousePointerSquareIcon className="mr-4 h-5 w-5" /> {roomName}{" "}
							</CardTitle>
						</CardHeader>

						<CardFooter className="flex flex-col items-start gap-1 text-muted-foreground">
							<p>Created: {createdAt}</p>
							<p>Members: 10</p>
						</CardFooter>
					</Card>
				</Link>
			</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuItem onClick={() => handleCopyRoomId()}>Copy Room ID</ContextMenuItem>
				<ContextMenuItem onClick={() => handleCopyRoomLink()}>Copy Room Link</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
};

export default Room;
