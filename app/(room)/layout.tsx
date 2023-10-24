import RoomNavbar from "@/components/sections/room-navbar";

interface RoomLayoutProps {
	children: React.ReactNode;
}

export default function RoomLayout({ children }: RoomLayoutProps) {
	return (
		<>
			<RoomNavbar />
			{children}
		</>
	);
}
