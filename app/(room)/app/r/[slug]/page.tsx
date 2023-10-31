const RoomPage = ({ params }: { params: { slug: string } }) => {
	return (
		<div className="h-[100dvh] p-5">
			<h1>RoomPage</h1>
			<p>{params.slug}</p>
		</div>
	);
};

export default RoomPage;
