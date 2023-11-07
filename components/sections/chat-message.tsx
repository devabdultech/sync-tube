import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ChatMessage = ({username} : {username: string}) => {
	return (
		<div className="mb-3 flex gap-2">
			<Avatar className="h-6 w-6">
				<AvatarImage src="https://github.com/shadcn.png" />
				<AvatarFallback>CN</AvatarFallback>
			</Avatar>
			<div>
				<h3 className="text-muted-foreground">{username}</h3>
				<p className="text-sm leading-relaxed tracking-wide">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam veritatis minima itaque
					corrupti eos qui culpa aspernatur facere, soluta illum quidem amet quo ut maiores ratione
					modi quasi. Error tempore enim maiores, necessitatibus magnam sit?
				</p>
			</div>
		</div>
	);
};

export default ChatMessage;
