import PropagateLoader from "react-spinners/PropagateLoader";

const Loading = () => {
	return (
		<div className="mt-16 flex h-full w-full items-center justify-center">
			<PropagateLoader
				color={"#36d7b7"}
				size={20}
				aria-label="Loading Spinner"
				data-testid="loader"
			/>
		</div>
	);
};

export default Loading;
