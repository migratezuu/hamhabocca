import SearchFilter from "../components/commons/SearchFilter";
import RallyList from "../components/lists/RallyList";
import style from "./RallyBoard.module.css";
import { useLocation } from "react-router";
import { HiChevronDoubleLeft, HiChevronLeft, HiChevronRight, HiChevronDoubleRight } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { callSearchRallyAPI } from "../apis/RallyAPICalls";


function RallySearchBoard() {

    const dispatch = useDispatch();
    const rallies = useSelector((state) => state.rallyReducer);
    const rallyList = rallies?.rallyList;
    const pageInfo = rallies?.paging;

    const { search } = useLocation();

    const query = decodeURI(search).replace('?', '');

    // 현재 페이지
    const [currentPage, setCurrentPage] = useState(1);

    // 페이지 변경될 때마다 리렌더링
    useEffect(() => {

        dispatch(callSearchRallyAPI({
            criteria : query
        }));

    }, [currentPage]);

    // 총 페이지의 모음
    const pageNumber = [1];

    let lastPage = Array.isArray(pageInfo).length;   //임시

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
                        <option>모집마감</option>
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
                            <button style={currentPage === num ? { color: '#003ACE' } : null}>
                                {num}
                            </button>
                        </li>
                    ))}
                    <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === lastPage || currentPage === 1}>
                        <HiChevronRight />
                    </button>
                    <button onClick={() => setCurrentPage(lastPage)} disabled={currentPage === lastPage || currentPage === 1}>
                        <HiChevronDoubleRight />
                    </button>
                </article>

            </section>

        </main>
    );
}

export default RallySearchBoard;