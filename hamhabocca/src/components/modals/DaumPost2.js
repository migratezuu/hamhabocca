import DaumPostCode from 'react-daum-postcode';
import { useDispatch } from 'react-redux';
import { get_arrival, toggle_arrival } from '../../modules/AddressModule';

const DaumPost2 = ({}) => {

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

        dispatch(get_arrival(fullAddress));
        dispatch(toggle_arrival(false));
    }

    return (<DaumPostCode onComplete={handleComplete} className="post-code" style={{height:'100%'}}/>);
}
export default DaumPost2;