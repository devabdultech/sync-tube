const RoomPage = ({ params }: { params: { slug: string } }) => {
	return (
		<div>
			<h1>RoomPage</h1>
			<p>{params.slug}</p>
		</div>
	);
};

export default RoomPage;
