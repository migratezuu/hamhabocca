import SearchFilter from "../components/commons/SearchFilter";
import RallyList from "../components/lists/RallyList";
import style from "./RallyBoard.module.css";
import { useEffect, useState } from 'react';
import { HiChevronDoubleLeft, HiChevronLeft, HiChevronRight, HiChevronDoubleRight } from "react-icons/hi2";

import { callRallyListAPI } from "../apis/RallyAPICalls";
import { useDispatch, useSelector } from "react-redux";

function RallyBoard() {

    // 리덕스
    const dispatch = useDispatch();
    const rallies = useSelector((state) => state.rallyReducer);
    const rallyList = rallies?.rallyList?.content;
    const pageInfo = rallies?.paging;

    // 현재 페이지
    const [currentPage, setCurrentPage] = useState(1);

    // 총 페이지의 모음
    const pageNumber = [1];

    if (pageInfo) {
        for (let i = pageInfo.startPage + 1; i <= pageInfo.endPage; i++) {
            pageNumber.push(i);
        }
    }

    // 페이지 변경될 때마다 리렌더링
    useEffect(() => {

        dispatch(callRallyListAPI({ currentPage: currentPage }));

    }, [currentPage]);

    // 렌더링 성공적으로 될때만 리스트 조회 노출
    return (
        <main className={style.container}>
            <SearchFilter />
            <section className={style.board}>
                <article className={style.title}>
                    <h1>랠리 모집</h1>
                </article>

                <article className={style.category}>
                    <select className={style.select}>
                        <option>전체</option>
                        <option>모집중</option>
                        <option>모집완료</option>
                        <option>취소됨</option>
                        <option>완주!</option>
                    </select>
                    <div>타입</div>
                    <div>랠리명</div>
                    <div>랠리일정</div>
                    <div>지역</div>
                    <div>작성일</div>
                </article>

                <article className={style.list}>
                    {Array.isArray(rallyList) && <RallyList rallyList={rallyList} />}
                </article>

                <article className={style.pagination}>
                    <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
                        <HiChevronDoubleLeft />
                    </button>
                    <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} >
                        <HiChevronLeft />
                    </button>
                    {pageNumber.map((num) => (
                        <li key={num} onClick={() => setCurrentPage(num)}>
                            <button style={currentPage == num ? { color: '#003ACE' } : null}>
                                {num}
                            </button>
                        </li>
                    ))}
                    <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === pageInfo?.endPage || pageInfo?.endPage == 1}>
                        <HiChevronRight />
                    </button>
                    <button onClick={() => setCurrentPage(pageInfo?.endPage)} disabled={currentPage === pageInfo?.endPage || pageInfo?.endPage == 1}>
                        <HiChevronDoubleRight />
                    </button>
                </article>
            </section>
        </main>
    );
}

export default RallyBoard;