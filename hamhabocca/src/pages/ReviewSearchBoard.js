import ReviewSearchFilter from "../components/commons/ReviewSearchFilter";
import ReviewList from "../components/lists/ReviewList";
import style from "./ReviewSearchBoard.module.css";
import { useLocation } from "react-router";
import { HiChevronDoubleLeft, HiChevronLeft, HiChevronRight, HiChevronDoubleRight } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { callSearchReviewAPI } from "../apis/RallyReviewAPICalls";


function ReviewSearchBoard() {

    const dispatch = useDispatch();
    const reviewList = useSelector((state) => state.reviewReducer);
    const pageInfo = reviewList?.paging;

    const { search } = useLocation();

    const query = decodeURI(search).replace('?', '');

    // 현재 페이지
    const [currentPage, setCurrentPage] = useState(1);

    // 페이지 변경될 때마다 리렌더링
    useEffect(() => {

        dispatch(callSearchReviewAPI({
            criteria : query
        }));

    }, [currentPage]);

    // 총 페이지의 모음
    const pageNumber = [1];

    let lastPage = Array.isArray(pageInfo).length;   //임시

    return (
        <main className={style.container}>

            <ReviewSearchFilter/>
            <section className={style.board}>
                <article className={style.title}>
                    <h1>랠리 후기</h1>
                </article>
                <article className={style.category}>
                    <div>랠리 타입</div>
                    <div>랠리명</div>
                    <div>리뷰명</div>
                    <div>작성자</div>
                    <div>작성일</div>
                </article>

                <article className={style.list}>
                    {Array.isArray(reviewList) && <ReviewList reviewList={reviewList} />}
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

export default ReviewSearchBoard;