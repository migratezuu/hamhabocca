import style from './Home.module.css';
import RallCardMain from '../components/items/RallyCardMain';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { callRallyListAPI } from '../apis/RallyAPICalls';
import { getCurrentMember } from '../apis/MemberAPICalls';
import ModalNickname from '../components/modals/ModalNickname';

function Home() {

    const dispatch = useDispatch();
    const rallies = useSelector((state) => state.rallyReducer);
    const rallyList = rallies?.rallyList?.content?.filter(rally => rally.rallyStatus !== '취소됨').slice(0, 6);

    const isOpen = useSelector(state => state.modalsReducer.nicknameState);

    const currentPage = 1;

    const HAS_VISITED_BEFORE = localStorage.getItem('hasVisitedBefore');

    function toNotice() {
        window.location.replace("/notice");
    }

    useEffect(
        () => {

            if (window.localStorage.getItem('jwtToken')) {
                dispatch(getCurrentMember());
            }
            dispatch(callRallyListAPI({ currentPage: currentPage }));

            if (!HAS_VISITED_BEFORE || HAS_VISITED_BEFORE < new Date()) {

                popUp();
            }
        },
        []
    );

    const popUp = () => {
        window.open("/popup/initial", "_blank", "popup,width=520,height=860");
    }

    return (
        <>
            <main>
                <div className={style.Notice} onClick={toNotice}></div>
                <div className={style.NewestRallyAndMore}>
                    <h4>&gt; 최신 랠리 모집</h4>
                    <button><Link to='/rally'>더보기&nbsp;&nbsp; &gt;</Link></button>
                </div>
                <div className={style.Rallycards}>
                    {Array.isArray(rallyList) && rallyList.map(rally => <RallCardMain key={rally.rallyId} rally={rally} />)}
                </div>
                {isOpen && <ModalNickname />}
            </main>
        </>
    )
}

export default Home;