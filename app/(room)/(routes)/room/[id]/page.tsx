const RoomId = ({ params }: { params: { id: string } }) => {
	const { id } = params;
	return (
		<div>
			<h1>Room {id}</h1>
		</div>
	);
};

export default RoomId;
