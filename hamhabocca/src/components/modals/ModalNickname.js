import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { CLOSE_MODAL, OPEN_NICKNAME_OK } from '../../modules/ModalsModule';
import { checkNickname, modifyProfile } from '../../apis/MemberAPICalls';
import { RESET_NICKNAME } from '../../modules/NicknameModule';
import styles from './ModalNickname.module.css';

function ModalNicknameOk({ nickname }) {

    const dispatch = useDispatch();
    const isOpen = useSelector(state => state.modalsReducer.nicknameOkState);

    return (
        <Modal isOpen={isOpen} onRequestClose={() => dispatch({ type: CLOSE_MODAL })} ariaHideApp={false} className={styles.modal} style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '99' } }}>
            <div className={styles.all}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <h3>환영합니다.</h3>
                    </div>
                    <div className={styles.info}>
                        <div className={styles.nickname}>
                            <h3>{nickname}님!</h3>
                            <h4>회원가입을 축하드립니다. 즐거운 랠리 되세요!</h4>
                        </div>
                        <div>
                            <input
                                type='button'
                                className={styles.ok}
                                onClick={() => {
                                    dispatch({ type: CLOSE_MODAL });
                                    dispatch({ type: RESET_NICKNAME });
                                }}
                                value='확인' />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

function ModalNickname() {

    const dispatch = useDispatch();
    const isOpen = useSelector(state => state.modalsReducer.nicknameState);
    const oKIsOpen = useSelector(state => state.modalsReducer.nicknameOkState);

    const [checkResultView, setCheckResultView] = useState("닉네임 중복 확인 필수");
    const checkResult = useSelector(state => state.nicknameReducer);
    const [nickname, setNickname] = useState("");

    const onClickHandler = () => {
        if (checkResultView === "사용 가능한 닉네임입니다!") {
            dispatch({ type: OPEN_NICKNAME_OK })

            sendNewNickname();
        } else {
            alert("닉네임을 확인해주세요!");
        }
    };

    function sendNewNickname() {

        const formData = new FormData();

        formData.append("nickname", nickname);
        formData.append("preferredLocation", "");
        formData.append("preferredType", "");

        dispatch(modifyProfile({ form: formData }));
    }

    useEffect(() => {

        if (checkResult === true) {

            console.log("겹치는 이름 있음")
            setCheckResultView("사용 중인 닉네임입니다!");
        }

        if (checkResult === false) {

            console.log("겹치는 이름 없음")
            setCheckResultView("사용 가능한 닉네임입니다!");
        }
    },
        [checkResult]
    );

    return (
        <Modal isOpen={isOpen} ariaHideApp={false} className={styles.modal} style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '95' } }}>
            <div>
                <div className={styles.header}>
                    <h3>닉네임 설정</h3>
                </div>
                <div className={styles.info}>
                    <div className={styles.nickname}>
                        <div className={styles.checkResult}>
                            <h6>{checkResultView}</h6>
                        </div>
                        <div>
                            <input className={styles.textfield} type="text" size="20" name="nickname" onChange={(e) => { setNickname(e.target.value) }} />
                            <input className={styles.checkName} type='button' value='중복확인' onClick={() => { dispatch(checkNickname(nickname)) }} />
                        </div>
                    </div>
                    <div>
                        <input type='button' className={styles.ok} onClick={() => onClickHandler()} value='확인' />
                        {oKIsOpen && <ModalNicknameOk nickname={nickname} />}
                    </div>
                </div>
            </div>
        </Modal>
    );
}
export default ModalNickname;