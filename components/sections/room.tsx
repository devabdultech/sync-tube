import Link from "next/link";
import { MousePointerSquareIcon } from "lucide-react";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Room = ({
	roomId,
	roomName,
	createdAt
}: {
	roomId: string;
	roomName: string;
	createdAt: string;
}) => {
	return (
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
	);
};

export default Room;
