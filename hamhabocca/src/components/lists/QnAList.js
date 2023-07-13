import QnACardBoard from "../items/QnACardBoard";

function QnAList({ qnaList }) {

	return (
		<>
			{qnaList.map(qna => <QnACardBoard key={qna.qnaId} qna={qna} />)}
		</>
	);
}

export default QnAList;


