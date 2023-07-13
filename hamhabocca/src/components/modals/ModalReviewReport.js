import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../modules/ModalsModule';
import styles from './ModalReport.module.css';
import { callPostReviewReportAPI } from '../../apis/ReviewReportAPICalls';
import { useEffect, useState } from 'react';

function ModalReviewReport() {

    const dispatch = useDispatch();
    const isOpen = useSelector(state => state.modalsReducer.reportReviewState);

    const [form, setForm] = useState({
        reportReason: '',
        reportReasonDetail: ''
    });

    useEffect(
        () => {
            setForm({
                ...form,
            })
        }, []
    );

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const onClickReviewReportHandler = () => {

        const formData = new FormData();

        formData.append("reportReason", form.reportReason);
        formData.append("reportReasonDetail", form.reportReasonDetail);

        dispatch(callPostReviewReportAPI({ form: formData }));

        window.location.reload();
    };

    return (
        <Modal isOpen={isOpen} ariaHideApp={false} className={styles.modal} style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '98' } }}>

            <div>
                <div className={styles.header}>
                    <h3>신고 하기</h3>
                </div>
                <div className={styles.info}>

                    <div className={styles.report1}>
                        <div className={styles.text1}>
                            <h4>신고사유</h4>
                        </div>
                        <div className={styles.radio}>
                            <form className={styles.form}>
                                <input type="radio" name="reportReason" value="ad" id="ad" onChange={onChangeHandler} /><label for="ad">광고(부적절한 홍보 및 음란성 게시글 및 댓글)</label><br />
                                <input type="radio" name="reportReason" value="word" id="word" onChange={onChangeHandler} /><label for="word">욕설/반말/부적절한 언어 사용</label><br />
                                <input type="radio" name="reportReason" value="member" id="member" onChange={onChangeHandler} /><label for="member">회원 비방</label><br />
                                <input type="radio" name="reportReason" value="comment" id="comment" onChange={onChangeHandler} /><label for="comment">도배성 댓글</label><br />
                                <input type="radio" name="reportReason" value="etc" id="etc" onChange={onChangeHandler} /><label for="etc">기타(상세 사유에 내용을 꼭 적어주세요.)</label>
                            </form>
                        </div>
                    </div>
                    <div className={styles.report2}>
                        <div className={styles.text2}>
                            <h6>신고 사유 기재해주세요(선택사항)</h6>
                        </div>
                        <div className={styles.report3}>
                            <div>
                                <h4>상세사유</h4>
                            </div>
                            <div className={styles.textarea}>
                                <form>
                                    <textarea cols="30" rows="5" name="reportReasonDetail" onChange={onChangeHandler}></textarea>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
                <h6 className={styles.text3}>
                    * 허위신고일 경우, 신고자의 서비스 활동이 제한될 수 있으니
                    <br />
                    * 신중하게 신고해주세요.
                </h6>
                <div className={styles.button}>
                    <input type='button' className={styles.ok} onClick={() => onClickReviewReportHandler()} value='신고하기' />
                    <input type='button' className={styles.close} onClick={() => dispatch(closeModal())} value='취소' />
                </div>
            </div>
        </Modal>
    );
}
export default ModalReviewReport;