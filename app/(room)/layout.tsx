import RoomNavbar from "@/components/sections/room-navbar";

interface RoomLayoutProps {
	children: React.ReactNode;
}

export default function RoomLayout({ children }: RoomLayoutProps) {
	return (
		<main className="min-h-[100dvh]">
			<RoomNavbar />
			{children}
		</main>
	);
}
