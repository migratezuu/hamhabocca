import style from './WriteRallyPost.module.css';
import SearchFilter from '../components/commons/SearchFilter';
import EnterRallyAddress from '../components/items/EnterRallyAddress';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reset_state } from '../modules/AddressModule';
import { useEffect, useState } from 'react';
import { callPostRallyAPI } from '../apis/RallyAPICalls';
import Kakaomap from '../components/items/Kakaomap';

function WriteRallyPost() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isClick, setIsClick] = useState(false);
    const toggleHandler = () => setIsClick(!isClick);

    const [form, setForm] = useState({
        rallyName: '',
        rallyType: '',
        rallyLocation: '',
        rallyEndLocation: '',
        rallyDate: '',
        rallyMaximum: 0,
        rallyMinimum: 0,
        rallyDistance: 0,
        rallyDetail: ''
    });

    // 입력한 주소 가져오기
    const departureAddress = useSelector(state => state.addressReducer.departureState);
    const arrivalAddress = useSelector(state => state.addressReducer.arrivalState);

    useEffect(
        () => {
            setForm({
                ...form,
                rallyLocation: departureAddress,
                rallyEndLocation: arrivalAddress
            })
        }, [departureAddress && arrivalAddress]
    );

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const onClickRallyPost = () => {

        const formData = new FormData();

        formData.append("rallyName", form.rallyName);
        formData.append("rallyType", form.rallyType);
        formData.append("rallyLocation", form.rallyLocation);
        formData.append("rallyEndLocation", form.rallyEndLocation);
        formData.append("rallyDate", form.rallyDate);
        formData.append("rallyMaximum", form.rallyMaximum);
        formData.append("rallyMinimum", form.rallyMinimum);
        formData.append("rallyDistance", form.rallyDistance);
        formData.append("rallyDetail", form.rallyDetail)

        dispatch(callPostRallyAPI({ form: formData }));
        dispatch(reset_state());
        alert('모집 게시판으로 이동합니다.');
        navigate('/rally', { replace: true });
        window.location.reload();
    };

    const onClickPostHandler = () => {

        const formList = Object.entries(form).slice(0, 8);

        if (formList.filter(value => value[1] === '').length == 0) {
            return onClickRallyPost();
        }

        alert("*항목은 필수입니다!\n원활한 랠리 모집을 위해 기입하시길 바랍니다.");
    }

    return (
        <main className={style.container}>
            <SearchFilter />
            <section className={style.board}>
                <article className={style.title}>
                    <h1>랠리 모집글 작성</h1>
                    <div>
                        <button className={style.edit} onClick={onClickPostHandler}>등록</button>
                    </div>
                </article>
                <article className={style.rallyPost}>
                    <form id='rallyForm'>
                        <div className={style.rallyType}>
                            <h3>*랠리 타입을 선택해주세요</h3>
                            <div className={style.RallyType}>
                                <div>
                                    <input type="radio" id="lvl1" name="rallyType" value={'입문'} onChange={onChangeHandler} />
                                    <label htmlFor='lvl1'>입문</label>
                                </div>
                                <div>
                                    <input type="radio" id="lvl2" name="rallyType" value={'초보'} onChange={onChangeHandler} />
                                    <label htmlFor='lvl2'>초보</label>
                                </div>
                                <div>
                                    <input type="radio" id="lvl3" name="rallyType" value={'중수'} onChange={onChangeHandler} />
                                    <label htmlFor='lvl3'>중수</label>
                                </div>
                                <div>
                                    <input type="radio" id="lvl4" name="rallyType" value={'고수'} onChange={onChangeHandler} />
                                    <label htmlFor='lvl4'>고수</label>
                                </div>
                                <div>
                                    <input type="radio" id="lvl5" name="rallyType" value={'전설'} onChange={onChangeHandler} />
                                    <label htmlFor='lvl5'>전설</label>
                                </div>
                                <button className={style.QuestionButton}>?</button>
                            </div>
                        </div>
                        <div className={style.rallyName}>
                            <h3>*랠리명을 적어주세요.<p>(글자수제한있음 특수문자 불가)</p></h3>
                            <input type="text" name='rallyName' onChange={onChangeHandler} />
                        </div>
                        <div className={style.rallyMap}>
                            <div className={style.mapImg}>
                                <h3>랠리 모집 정보</h3>
                                <div>
                                    {departureAddress && arrivalAddress ? <Kakaomap departureAddress={departureAddress} arrivalAddress={arrivalAddress} /> : null}
                                </div>
                            </div>
                            <div className={style.mapInfo}>
                                <div className={style.people}>
                                    <h3>*랠리 모집 인원</h3>
                                    <div>
                                        <p>최소</p>
                                        <input type='text' name='rallyMinimum' onChange={onChangeHandler} placeholder='0'/>
                                        <p>명 </p>
                                        <p> ~ </p>
                                        <p>최대</p>
                                        <input type='text' name='rallyMaximum' onChange={onChangeHandler} placeholder='0'/>
                                        <p>명</p>
                                    </div>
                                </div>
                                <div className={style.estimate}>
                                    <div>
                                        <h3>*랠리 출발 일시</h3>
                                        <input type='datetime-local' name='rallyDate' onChange={onChangeHandler} className={style.dateInput} />
                                    </div>
                                    <div>
                                        <h3>*총 예상 거리</h3>
                                        <input type='text' name='rallyDistance' onChange={onChangeHandler} placeholder="    km" />
                                    </div>
                                </div>
                                <div className={style.setMap}>
                                    <button type='button' onClick={toggleHandler}>출발지/도착지</button>
                                </div>
                            </div>
                        </div>
                        <div className={style.enter}>
                            {isClick && <EnterRallyAddress />}
                        </div>
                    </form>
                    <div className={style.text}>
                        <textarea name='rallyDetail' onChange={onChangeHandler} placeholder='구체적인 장소, 예상 완주 시간 등 랠리 상세 내용을 적어주세요.'></textarea>
                    </div>
                </article>
            </section>
        </main>
    );
}

export default WriteRallyPost;