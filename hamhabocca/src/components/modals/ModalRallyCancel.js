import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_MODAL, OPEN_CANCEL_RALLY_OK } from "../../modules/ModalsModule";
import { callModifyRallyAPI } from '../../apis/RallyAPICalls';
import styles from './Modal.module.css';

function ModalRallyCancelOk({ rally }) {

    const dispatch = useDispatch();
    const isOpen = useSelector(state => state.modalsReducer.cancelRallyOkState);

    return (
        <Modal isOpen={isOpen} ariaHideApp={false} className={styles.modal} style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '98' } }}>
            <div className={styles.all}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <h3>랠리 모집 취소</h3>
                    </div>
                    <div className={styles.info}>
                        <h3>{rally.rallyName}</h3>
                        <h2>랠리 모집을 취소하였습니다.</h2>
                        <div>
                            <button className={styles.ok} onClick={() => {dispatch({ type: CLOSE_MODAL }); window.location.reload(); }}>확인</button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

function ModalRallyCancel({ rally }) {

    const dispatch = useDispatch();
    const isOpen = useSelector(state => state.modalsReducer.cancelRallyState);
    const okIsOpen = useSelector(state => state.modalsReducer.cancelRallyOkState);

    // 상태변경
    const onClickRallyStatusUpdateHandler = (status) => {

        const formData = new FormData();
        formData.append("rallyStatus", status);

        dispatch(callModifyRallyAPI({
            form: formData,
            rallyId: rally.rallyId
        }));
    }

    return (
        <Modal isOpen={isOpen} ariaHideApp={false} className={styles.modal} style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '98' } }}>

            <div>
                <div className={styles.header}>
                    <h3>랠리 모집 취소</h3>
                </div>
                <div className={styles.info}>
                    <h2>모집한 랠리를 취소하시겠습니까?</h2>
                    <h6 className={styles.text}> * 취소 한 후에는 되돌릴 수 없습니다! <br /> * 잦은 취소는 이용자의 서비스 활동이 제한될 수 있습니다. </h6>
                    <div>
                        <button
                            className={styles.ok}
                            onClick={() => {
                                dispatch({ type: OPEN_CANCEL_RALLY_OK });
                                onClickRallyStatusUpdateHandler("취소됨");
                            }}>
                            랠리취소
                        </button>
                        {okIsOpen && <ModalRallyCancelOk rally={rally} />}
                        <button className={styles.close} onClick={() => dispatch({ type: CLOSE_MODAL })} >취소</button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
export default ModalRallyCancel;