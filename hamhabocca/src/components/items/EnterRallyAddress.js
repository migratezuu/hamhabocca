import { useDispatch, useSelector } from 'react-redux';
import { get_departure, get_arrival, toggle_departure, toggle_arrival} from '../../modules/AddressModule';
import DaumPost1 from '../modals/DaumPost1';
import DaumPost2 from '../modals/DaumPost2';
import Modal from 'react-modal';
import style from './EnterRallyAddress.module.css';

function EnterRallyAddress() {

    const dispatch = useDispatch();

    /* state값 가져오기 */
    const departureAddress = useSelector(state => state.addressReducer.departureState);
    const arrivalAddress = useSelector(state => state.addressReducer.arrivalState);
    const isOpenModal1 = useSelector(state => state.addressReducer.departureModalIsOpen);
    const isOpenModal2 = useSelector(state => state.addressReducer.arrivalModalIsOpen);

    const onChangeHandlerDeparture = (e) => {
        dispatch(get_departure(e.target.value));
    }

    const onChangeHandlerArrival = (e) => {
        dispatch(get_arrival(e.target.value));
    }

    const showModal = () => {
        document.body.style.overflow = "hidden";
    };

    const hideModal = () => {
        document.body.style.overflow = "unset";
    };

    const onClickHandler1 = () => {
        dispatch(toggle_departure(true));
        showModal();
    }

    const onClickHandler2 = () => {
        dispatch(toggle_arrival(true));
        showModal();
    }

    if(isOpenModal1 === false && isOpenModal2 === false) {
        hideModal();
    }

    return (
        <div className={style.address}>
            <Modal isOpen={isOpenModal1} onRequestClose={() => dispatch(toggle_departure(false))} ariaHideApp={false} className={style.modal} style={{overlay: {backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '98'}}}>
                    <DaumPost1/>
            </Modal>

            <Modal isOpen={isOpenModal2} onRequestClose={() => dispatch(toggle_arrival(false))} ariaHideApp={false} className={style.modal} style={{overlay: {backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '98'}}}>
                    <DaumPost2/>
            </Modal>

            <div>
                <button type='button' onClick={ onClickHandler1 }>출발지 검색</button>
                <input value={departureAddress || ""} onChange={onChangeHandlerDeparture} readOnly placeholder='출발지를 검색해주세요!' />
            </div>
            <div>
                <button type='button' onClick={ onClickHandler2 }>도착지 검색</button>
                <input value={arrivalAddress || ""} onChange={onChangeHandlerArrival} readOnly placeholder='도착지를 검색해주세요!' />
            </div>
        </div>
    );
}

export default EnterRallyAddress;