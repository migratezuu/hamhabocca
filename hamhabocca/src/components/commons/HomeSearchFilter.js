import { BiPlus, BiMinus } from "react-icons/bi";
import sigunguList from '../../data/sigungu.json';
import { useState } from "react";
import style from './HomeSearchFilter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { distanceIncrease, distanceDecrease, peopleIncrease, peopleDecrease } from '../../modules/CountModule';

function searchSig(sido) {

    return sigunguList.filter(sig => sig.sig.sig_full_nm.startsWith(sido));
}

function Sigoon({ sig }) {

    return <option value={sig.sig.sig_kor_nm} >{sig.sig.sig_kor_nm}</option>;
}

function HomeSearchFilter() {

    const dispatch = useDispatch();

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
        const checkboxes = document.getElementsByName('RallyType')
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i] !== checkThis) {
                checkboxes[i].checked = false
            }
        }
    }

    return (
        <div className={style.HomeSearchFilter}>
            <form action="/rally/search">
                <fieldset className={style.RallyType}>
                    <div>
                        <input type={'radio'} id="ipmun" name='type' value={'입문'} />
                        <label htmlFor='ipmun'>입문</label>
                    </div>
                    <div>
                        <input type={'radio'} id="chobo" name='type' value={'초보'} />
                        <label htmlFor='chobo'>초보</label>
                    </div>
                    <div>
                        <input type={'radio'} id="jungsu" name='type' value={'중수'} />
                        <label htmlFor='jungsu'>중수</label>
                    </div>
                    <div>
                        <input type={'radio'} id="gosu" name='type' value={'고수'} />
                        <label htmlFor='gosu'>고수</label>
                    </div>
                    <div>
                        <input type={'radio'} id="legend" name='type' value={'전설'} />
                        <label htmlFor='legend'>전설</label>
                    </div>
                </fieldset>
                <fieldset className={style.RallyLocation}>
                    <select name='sido' id="sido" onChange={onChangeSidoHandler}>
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
                        <option value="충북">충청북도</option>
                        <option value="충남">충청남도</option>
                        <option value="전북">전라북도</option>
                        <option value="전남">전라남도</option>
                        <option value="경북">경상북도</option>
                        <option value="경남">경상남도</option>
                        <option value="제주특별자치도">제주특별자치도</option>
                    </select>
                    <select name='sigungu' id="sigungu" onChange={onChangeSigunguHandler} readOnly>
                        <option value=''>시/군/구</option>
                        {sigList.map(sig => <Sigoon key={sig.id} sig={sig} />)}
                    </select>
                    <input type="month" min="2023-01" max="2023-12" name='date' />
                </fieldset>
                <fieldset className={style.DistanceAndPeople}>
                    <fieldset className={style.RallyDistance}>
                        <label>최대 거리</label>
                        <button type='button' onClick={distanceCountDecrease}><BiMinus /></button>
                        <input name='distance' value={distanceCount} readOnly />km
                        <button type='button' onClick={distanceCountIncrease}><BiPlus /></button>
                    </fieldset>
                    <fieldset className={style.RallyPeople}>
                        <label>최대 인원</label>
                        <button type='button' onClick={peopleCountDecrease}><BiMinus /></button>
                        <input name='people' value={peopleCount} readOnly />명
                        <button type='button' onClick={peopleCountIncrease}><BiPlus /></button>
                    </fieldset>
                </fieldset>
                <input type="hidden" id="location" name="location" value={location.SIDO + " " + location.SIGUNGU} />
                <input type={'submit'} value='랠리 검색' className={style.Submit} style={{cursor: "pointer"}}/>
            </form>
        </div>
    )
}

export default HomeSearchFilter;