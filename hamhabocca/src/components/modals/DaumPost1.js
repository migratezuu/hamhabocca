import DaumPostCode from 'react-daum-postcode';
import { useDispatch } from 'react-redux';
import { get_departure, toggle_departure } from '../../modules/AddressModule';

const DaumPost1 = ({}) => {

    const dispatch = useDispatch();

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';
        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        dispatch(get_departure(fullAddress));
        dispatch(toggle_departure(false));
    }

    return (<DaumPostCode onComplete={handleComplete} className="post-code" style={{height:'100%'}} autoClose/>);
}
export default DaumPost1;