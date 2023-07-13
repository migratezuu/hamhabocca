import RallyCardBoard from "../items/RallyCardBoard";

function RallyList({ rallyList }) {

	return (
		<>
			{rallyList && rallyList.map(rally => <RallyCardBoard key={rally.rallyId} rally={rally} />)}
		</>
	);
}

export default RallyList;