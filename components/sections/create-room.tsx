import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

const CreateRoom = () => {
	return (
		<Dialog>
			<DialogTrigger className="w-full">
				<Card className="w-full h-[250px] lg:w-[300px]">
					<CardContent className="flex h-full flex-col items-center justify-center">
						<PlusIcon />
						<h3 className="text-lg font-medium">Create Room</h3>
					</CardContent>
				</Card>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create Room</DialogTitle>
					<DialogDescription>Input the room details you want to create</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid gap-2">
						<Label htmlFor="roomName">Room Name</Label>
						<Input id="roomName" placeholder="Enter room name" />
					</div>
				</div>
				<DialogFooter>
					<Button>Create Room</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default CreateRoom;
