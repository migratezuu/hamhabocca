import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_MODAL, OPEN_OK } from "../../modules/ModalsModule";
import { callCancelParticipateRallyAPI } from '../../apis/ParticipateAPICalls';
import styles from './Modal.module.css';

function ModalParticipateCancelOK({ rally }) {

    const dispatch = useDispatch();
    const isOpen = useSelector(state => state.modalsReducer.okState);

    return (
        <Modal isOpen={isOpen} ariaHideApp={false} className={styles.modal} style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '98' } }}>
            <div className={styles.all}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <h3>랠리 참가 취소</h3>
                    </div>
                    <div className={styles.info}>
                        <h3>{rally?.rallyName}</h3>
                        <h2>랠리 신청을 취소하였습니다.</h2>
                        <h5 className={styles.text}> * 잦은 취소는 이용자의 서비스 활동이 제한될 수 있습니다.</h5>
                        <div>
                            <button className={styles.ok} onClick={() => { dispatch({ type: CLOSE_MODAL }); window.location.reload(); }}>확인</button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

function ModalParticipateCancel({ rally }) {

    const dispatch = useDispatch();
    const isOpen = useSelector(state => state.modalsReducer.cancelParticipateState);
    const oKIsOpen = useSelector(state => state.modalsReducer.okState);

    return (
        <Modal isOpen={isOpen} ariaHideApp={false} className={styles.modal} style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '98' } }}>

            <div>
                <div className={styles.header}>
                    <h3>랠리 참가 취소</h3>
                </div>
                <div className={styles.info}>
                    <h3>{rally?.rallyName}</h3>
                    <h2>랠리 신청을 취소하시겠습니까?</h2>
                    <h5 className={styles.text}> * 잦은 취소는 이용자의 서비스 활동이 제한될 수 있습니다.</h5>
                    <div>
                        <button
                            className={styles.nagetive}
                            onClick={() => {
                                dispatch({ type: OPEN_OK });
                                dispatch(callCancelParticipateRallyAPI({ rallyId: rally.rallyId }));
                            }}>신청취소</button>
                        {oKIsOpen && <ModalParticipateCancelOK rally={rally} />}
                        <button className={styles.close} onClick={() => dispatch({ type: CLOSE_MODAL })}>닫기</button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
export default ModalParticipateCancel;