import style from './SearchFilter.module.css';
import { BiPlus, BiMinus } from "react-icons/bi";
import sigunguList from '../../data/sigungu.json';
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { distanceIncrease, distanceDecrease, peopleIncrease, peopleDecrease } from '../../modules/CountModule';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdRefresh } from "react-icons/io";

function searchSig(sido) {

    return sigunguList.filter(sig => sig.sig.sig_full_nm.startsWith(sido));
}

function Sigoon({ sig }) {

    return <option value={sig.sig.sig_kor_nm} >{sig.sig.sig_kor_nm}</option>;
}

function SearchFilter() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    /* 회원 확인 */
    const token = window.localStorage.getItem("jwtToken");

    /* state값 가져오기 */
    const distanceCount = useSelector(state => state.countReducer.distanceState);
    const peopleCount = useSelector(state => state.countReducer.peopleState);

    /* 증감버튼 클릭이벤트핸들러 */
    const distanceCountIncrease = () => dispatch(distanceIncrease());
    const distanceCountDecrease = () => { distanceCount > 0 && dispatch(distanceDecrease()) };
    const peopleCountIncrease = () => dispatch(peopleIncrease());
    const peopleCountDecrease = () => { peopleCount > 0 && dispatch(peopleDecrease()) };

    // 시도 선택시 시군구 리스트 담음
    const [sigList, setSigList] = useState([]);

    // 시도 + 시군구 합치기
    const [location, setLocation] = useState({
        SIDO: '',
        SIGUNGU: ''
    });

    const onChangeSidoHandler = (e) => {
        setSigList(searchSig(e.target.value));
        setLocation({
            ...location,
            SIDO: e.target.value
        })
    }

    const onChangeSigunguHandler = (e) => {
        setLocation({
            ...location,
            SIGUNGU: e.target.value
        })
    }

    /* 체크박스 - 한번만 체크할 수 있도록 */
    const checkOnlyOne = (checkThis) => {
        const checkboxes = document.getElementsByName('type')
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i] !== checkThis) {
                checkboxes[i].checked = false
            }
        }
    }

    return (
        <div className={style.filter}>
            <article className={style.title}>
                <h1>Filter</h1>
                <button className={style.refresh} onClick={()=> { navigate('/rally'); }}><IoMdRefresh/></button>
            </article>

            <form className={style.form} action={"/rally/search"}>
                <section>
                    <article className={style.rallytype}>
                        <h2>랠리 타입</h2>
                        <div>
                            <input type="checkbox" id="ipmun" name='type' value='입문' onChange={(e) => checkOnlyOne(e.target)} />
                            <label htmlFor='ipmun'>입문</label>
                        </div>
                        <div>
                            <input type="checkbox" id="chobo" name='type' value='초보' onChange={(e) => checkOnlyOne(e.target)} />
                            <label htmlFor='chobo'>초보</label>
                        </div>
                        <div>
                            <input type="checkbox" id="jungsu" name='type' value='중수' onChange={(e) => checkOnlyOne(e.target)} />
                            <label htmlFor='jungsu'>중수</label>
                        </div>
                        <div>
                            <input type="checkbox" id="gosu" name='type' value='고수' onChange={(e) => checkOnlyOne(e.target)} />
                            <label htmlFor='gosu'>고수</label>
                        </div>
                        <div>
                            <input type="checkbox" id="legend" name='type' value='전설' onChange={(e) => checkOnlyOne(e.target)} />
                            <label htmlFor='legend'>전설</label>
                        </div>
                    </article>

                    <article className={style.rallylocal}>
                        <h2>랠리 장소</h2>
                        <select id="sido" onChange={onChangeSidoHandler}>
                            <option value="">시/도</option>
                            <option value="서울">서울특별시</option>
                            <option value="부산">부산광역시</option>
                            <option value="대구">대구광역시</option>
                            <option value="인천">인천광역시</option>
                            <option value="광주">광주광역시</option>
                            <option value="대전">대전광역시</option>
                            <option value="울산">울산광역시</option>
                            <option value="세종특별자치시">세종특별자치시</option>
                            <option value="경기도">경기도</option>
                            <option value="강원도">강원도</option>
                            <option value="충청북도">충청북도</option>
                            <option value="충청남도">충청남도</option>
                            <option value="전라북도">전라북도</option>
                            <option value="전라남도">전라남도</option>
                            <option value="경상북도">경상북도</option>
                            <option value="경상남도">경상남도</option>
                            <option value="제주특별자치도">제주특별자치도</option>
                        </select>
                        <select id="sigungu" onChange={onChangeSigunguHandler} readOnly>
                            <option value="">시/군/구</option>
                            {sigList.map(sig => <Sigoon key={sig.id} sig={sig} />)}
                        </select>
                    </article>

                    <article className={style.rallydate}>
                        <h2>랠리 일정</h2>
                        <input type="month" min="2023-01" max="2023-12" name='date' />
                    </article>

                    <article className={style.rallydistance}>
                        <h2>랠리 거리</h2>
                        <div>
                            <button type='button' onClick={distanceCountDecrease}><BiMinus /></button>
                            <input name='distance' value={distanceCount} readOnly />km
                            <button type='button' onClick={distanceCountIncrease}><BiPlus /></button>
                        </div>
                    </article>

                    <article className={style.rallypeople}>
                        <h2>랠리 인원</h2>
                        <div>
                            <button type='button' onClick={peopleCountDecrease}><BiMinus /></button>
                            <input name='maximum' value={peopleCount} readOnly />명
                            <button type='button' onClick={peopleCountIncrease}><BiPlus /></button>
                        </div>
                    </article>
                </section>
                <input type="hidden" id="location" name="location" value={location.SIDO + " " + location.SIGUNGU} />
                <input type='submit' value='랠리 검색' className={style.search} />
            </form>

            {token != undefined &&
                <article className={style.recruit}>
                    <p>랠리장이 되어보세요!</p>
                    <Link to='/rally/write' style={{ color: 'white', textDecoration: 'none' }}><button>모집 작성</button></Link>
                </article>}
        </div>
    );
}

export default SearchFilter;