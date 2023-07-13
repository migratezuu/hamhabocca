import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from "../../modules/ModalsModule";
import styles from './ModalProfile.module.css';
import { checkNickname, modifyProfile } from '../../apis/MemberAPICalls';
import { useEffect, useState } from 'react';
import sigunguList from '../../data/sigungu.json';
import { RESET_NICKNAME } from '../../modules/NicknameModule';

function ModalProfile({ member }) {

    const dispatch = useDispatch();
    const isOpen = useSelector(state => state.modalsReducer.profileState);

    const [checkResultView, setCheckResultView] = useState("");

    const [sido, setSido] = useState("");
    const [sigungu, setSigungu] = useState("");
    const [sidosigungu, setSidosigungu] = useState("");

    const checkResult = useSelector((state) => state.nicknameReducer);

    const [form, setForm] = useState({
        nickname: "",
        preferredLocation: "",
        preferredType: ""
    });

    function searchSig(sido) {

        return sigunguList.filter(sig => sig.sig.sig_full_nm.startsWith(sido));
    }

    function Sigoon({ sig }) {

        return <option value={sig.sig.sig_kor_nm} readOnly>{sig.sig.sig_kor_nm}</option>;
    }

    const [sigList, setSigList] = useState([]);

    const onSigChangeHandler = (e) => {

        if (e.target.name == 'sido') {
            setSigList(searchSig(e.target.value));
            setSido(e.target.value);
        }

        if (e.target.name == 'sigungu') {
            setSigungu(e.target.value);
            setSidosigungu(sido + " " + e.target.value);
        }
    }

    const onChangeHandler = (e) => {

        console.log(e.target.name)

        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = () => {

        console.log(form);

        if (checkResult == false) {
            console.log("짜잔~")

            const formData = new FormData();

            formData.append("nickname", form.nickname);
            formData.append("preferredLocation", sidosigungu);
            formData.append("preferredType", form.preferredType);

            dispatch(modifyProfile({ form: formData }));

            alert("프로필 변경이 완료되었습니다.")

            window.location.reload();

        } else {
            alert("닉네임 중복 여부를 확인해주세요!");
        }
    }

    function checkName() {

        dispatch(checkNickname(form.nickname));
    }

    useEffect(() => {

        setCheckResultView("");

        if (typeof checkResult == 'boolean') {

            if (checkResult == true) {
                console.log("겹치는 이름 있음")

                setCheckResultView("사용 중인 닉네임입니다.");
            } else if (checkResult == false) {
                console.log("겹치는 이름 없음")

                setCheckResultView("사용 가능한 닉네임입니다!");
            }
        } else {
            console.log("초기화")

            setCheckResultView("");
        }


    },
        [checkResult]
    )

    return (
        <Modal isOpen={isOpen} ariaHideApp={false} className={styles.modal} style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '98' } }}>

            <div className={styles.all}>
                <div className={styles.header}>
                    <h3>프로필 수정</h3>
                </div>
                <div className={styles.info}>
                    <div className={styles.left}>
                        <div>
                            <h4>프로필사진</h4>
                        </div>
                        <div>
                            <h4>닉네임</h4>
                        </div>
                        <div>
                            <h4>선호지역</h4>
                        </div>
                        <div>
                            <h4>랠리타입</h4>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div>
                            <div className={styles.img1}>
                                <img
                                    src={member.imageSource}
                                    alt="avatar"
                                    className={styles.profile}
                                />
                            </div>
                            <div className={styles.button1}>
                                <input type='button' className={styles.change1} value='변경' />
                                <input type='button' className={styles.delete} value='삭제' />
                            </div>
                        </div>
                        <div className={styles.nickname}>
                            <div className={styles.checkResult}>
                                <h6>{checkResultView}</h6>
                            </div>
                            <div>
                                <input className={styles.textfield} type="text" size="20" name="nickname" onChange={onChangeHandler} />
                                <input className={styles.change2} type='button' value='확인' onClick={checkName} />
                            </div>
                        </div>
                        <div className={styles.local}>
                            <div>
                                <select className={styles.sido} name='sido' id='sido' onChange={onSigChangeHandler}>
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
                            </div>
                            <div>
                                <select className={styles.gungu} name='sigungu' id='sigungu' onChange={onSigChangeHandler} readOnly value={sigungu}>
                                    <option value="">시/군/구</option>
                                    {sigList.map(sig => <Sigoon key={sig.id} sig={sig} />)}
                                </select>
                            </div>
                        </div>
                        <div className={styles.rally1}>
                            <select className={styles.rally2} name='preferredType' onChange={onChangeHandler}>
                                <option>랠리타입</option>
                                <option value="입문">입문</option>
                                <option value="초보">초보</option>
                                <option value="중수">중수</option>
                                <option value="고수">고수</option>
                                <option value="전설">전설</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className={styles.button2}>
                    <input type='button' className={styles.ok} value='확인' onClick={onSubmitHandler} />
                    <input type='button' className={styles.close} onClick={() => {
                        dispatch({ type: RESET_NICKNAME });
                        console.log("먹긴 하는 거니...")
                        setCheckResultView("...");
                        dispatch(closeModal());
                    }} value='취소' />
                </div>
            </div>
        </Modal >

    );
}
export default ModalProfile;