import RallyCardMyPage from '../items/RallyCardMyPage';
import style from './MyPageList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { recruitedSize, participatedSize } from '../../modules/ListSizeModule';

function MyPageList({ typeOfList, rallyList }) {

    const dispatch = useDispatch();

    /* 불러오는 랠리 이력 갯수 디스패치 */
    const recruitedSizeState = useSelector(state => state.listSizeReducer.recruitedSizeState);
    const participatedSizeState = useSelector(state => state.listSizeReducer.participatedSizeState);

    /* 모집중/지난 랠리 리스트 */
    const currentList = Array.isArray(rallyList) && rallyList.filter(rally => rally.rallyStatus == '모집중' || rally.rallyStatus == '모집완료');
    const originalPastList =
        Array.isArray(rallyList) &&
        rallyList.filter(rally => rally.rallyStatus != '모집중')
    const pastList =
        Array.isArray(rallyList) &&
        rallyList.filter(rally => rally.rallyStatus != '모집중')
            .slice(0, (typeOfList == '모집' ? recruitedSizeState : participatedSizeState));

    /* 더보기 버튼의 함수 */
    const recruitedSizeIncrease = () => dispatch(recruitedSize());
    const participatedSizeIncrease = () => dispatch(participatedSize());

    /* 더보기 버튼 조건부 생성 */
    function readMoreButton() {

        if (typeOfList == '모집') {
            if (originalPastList?.length > recruitedSizeState) {
                return (
                    <button onClick={recruitedSizeIncrease}>더보기 +</button>
                )
            }
        }

        if (typeOfList == '참여') {
            if (originalPastList?.length > participatedSizeState) {
                return (
                    <button onClick={participatedSizeIncrease}>더보기 +</button>
                )
            }
        }
    }

    return (
        <section className={style.Container}>
            <h3>랠리 {typeOfList} 내역</h3>
            <h4>현재 진행 중인 랠리</h4>
            <div className={style.RallyContainer}>
                {Array.isArray(rallyList) && currentList.map(rally => <RallyCardMyPage key={rally.rallyId} rally={rally} typeOfList={typeOfList}/>)}
            </div>
            <h4>과거 랠리</h4>
            <div className={style.RallyContainer}>
                {Array.isArray(rallyList) && pastList.map(rally => <RallyCardMyPage key={rally.rallyId} rally={rally} typeOfList={typeOfList}/>)}
                {readMoreButton()}
            </div>
        </section>
    )
}

export default MyPageList;