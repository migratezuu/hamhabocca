import styles from './Modal.module.css';
import Modal from 'react-modal';
import { OPEN_DELETE_OK_ACCOUNT, closeModal } from '../../modules/ModalsModule';
import { useDispatch, useSelector } from 'react-redux';
import ModalDeactivateOk from './ModalDeactivateOk';
import { deactivateMember } from '../../apis/MemberAPICalls';

function ModalDeativate() {

    const dispatch = useDispatch();
    const isOpen = useSelector(state => state.modalsReducer.deleteAccountState);

    const deleteOkAccountState = useSelector(state => state.modalsReducer.deleteOkAccountState);

    return (
        <Modal isOpen={isOpen} ariaHideApp={false} className={styles.modal} style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '98' } }}>
            <div className={styles.all}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <h3>회원 탈퇴</h3>
                    </div>
                    <div className={styles.info}>
                        <h2 style={{ fontSize: '20px' }}>정말로 탈퇴하시겠습니까?</h2>
                        <br />
                        <h5 className={styles.text}>회원님의 정보는 30일간 저장되며, 그 이후 삭제됩니다. </h5>


                        <div>
                            <button className={styles.ok} onClick={() => { dispatch(deactivateMember()); dispatch({type: OPEN_DELETE_OK_ACCOUNT}) }}>확인</button>
                            {deleteOkAccountState && <ModalDeactivateOk />}
                            <button className={styles.close} onClick={() => dispatch(closeModal())} >취소</button>
                        </div>

                    </div>
                </div>
            </div>
        </Modal>
    );
}
export default ModalDeativate;