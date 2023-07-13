import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_MODAL, OPEN_OK } from "../../modules/ModalsModule";
import { callParticipateRallyByMateAPI } from '../../apis/ParticipateAPICalls';
import styles from './Modal.module.css';

function ModalParticipateOk({ rally }) {

    const dispatch = useDispatch();
    const isOpen = useSelector(state => state.modalsReducer.okState);

    return (
        <Modal isOpen={isOpen} ariaHideApp={false} className={styles.modal} style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '98' } }}>
            <div>
                <div className={styles.header}>
                    <h3>랠리 참가</h3>
                </div>
                <div className={styles.info}>
                    <h3>{rally.rallyName}</h3>
                    <h2>랠리에 참가 신청했습니다!</h2>
                    <h5 className={styles.text}>* 잦은 취소는 이용자의 서비스 활동이 제한될 수 있습니다.</h5>
                    <div>
                        <button className={styles.ok} onClick={() => {dispatch({ type: CLOSE_MODAL }); window.location.reload(); }}>확인</button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

function ModalParticipate({ rally }) {

    const dispatch = useDispatch();
    const isOpen = useSelector(state => state.modalsReducer.participateState);
    const okIsOpen = useSelector(state => state.modalsReducer.okState);

    return (
        <Modal isOpen={isOpen} ariaHideApp={false} className={styles.modal} style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '98' } }}>
            <div>
                <div className={styles.header}>
                    <h3>랠리 참가</h3>
                </div>
                <div className={styles.info}>
                    <h3>{rally.rallyName}</h3>
                    <h2>랠리에 참가하시겠습니까?</h2>
                    <h5 className={styles.text}>* 모두가 즐길 수 있는 랠리를 함께 만들어가요.</h5>
                    <div>
                        <button
                            className={styles.ok}
                            onClick={() => {
                                dispatch({ type: OPEN_OK });
                                dispatch(callParticipateRallyByMateAPI({ rallyId: rally.rallyId }));
                            }}>
                            참가신청
                        </button>
                        {okIsOpen && <ModalParticipateOk rally={rally} />}
                        <button className={styles.close} onClick={() => dispatch({ type: CLOSE_MODAL })}>취소</button>
                    </div>
                </div>
            </div>

        </Modal>
    );
}
export default ModalParticipate;