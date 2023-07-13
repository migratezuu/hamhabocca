import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../modules/ModalsModule';
import styles from './Modal.module.css';

function ModalDeactivateOk() {

    const dispatch = useDispatch();
    const isOpen = useSelector(state => state.modalsReducer.deleteOkAccountState);

    return (
        <Modal isOpen={isOpen} ariaHideApp={false} className={styles.modal} style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '98' } }}>
            <div className={styles.all}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <h3>회원 탈퇴</h3>
                    </div>
                    <div className={styles.info}>
                        <h2 style={{ fontSize: '20px' }}>회원 탈퇴 되었습니다.
                        </h2>
                        <br /><br />
                        <h5 className={styles.text}>회원님의 정보는 30일간 저장되며, 그 이후 삭제됩니다. </h5>
                        <div>
                            <input type='button' className={styles.close} onClick={() => dispatch(closeModal())} value='확인' />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
export default ModalDeactivateOk;