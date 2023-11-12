import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getRandomColor } from "@/lib/utils";

const ChatMessage = ({ username, imageSrc }: { username: string; imageSrc?: string }) => {
	return (
		<div className="mb-3 flex gap-2">
			{imageSrc ? (
				<Avatar className="h-6 w-6">
					<AvatarImage src={imageSrc} />
				</Avatar>
			) : (
				<div
					className={`bg-[${getRandomColor()}] flex h-6 w-6 items-center justify-center rounded-full border bg-red-300 p-3 text-center`}
				>
					<h4 className="text-center text-xs">{username.substring(0, 2).toUpperCase()}</h4>
				</div>
			)}

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
