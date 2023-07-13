import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { OPEN_DELETE_OK_POST, closeModal } from "../../modules/ModalsModule";
import styles from './Modal.module.css';
import { callQnaDeleteAPI } from '../../apis/QnAAPICalls';

function DeleteModal({qnaId}) {

    const dispatch = useDispatch();
    const isOpen = useSelector(state => state.modalsReducer.deletePostState);

    return (
        <Modal isOpen={isOpen} ariaHideApp={false} className={styles.modal} style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '98' } }}>

            <div>
                <div className={styles.header}>
                    <h3>삭제 확인</h3>
                </div>
                <div className={styles.info}>
                    <h4> 정말로 삭제하시겠습니까?</h4>
                    <br />
                    <h6 className={styles.text}> * 삭제된 후에는 되돌릴 수 없습니다. </h6>

                    <input 
                        type='button' 
                        className={styles.ok} 
                        onClick={() => { 
                            dispatch({type: OPEN_DELETE_OK_POST});
                            dispatch(callQnaDeleteAPI({qnaId: qnaId}));
                    }} value='확인' />
                    <input type='button' className={styles.close} onClick={() => dispatch(closeModal())} value='취소' />
                </div>
            </div>
        </Modal>
    );
}
export default DeleteModal;