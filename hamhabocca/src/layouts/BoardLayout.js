import { Outlet } from 'react-router-dom';
import Manuber from '../components/commons/Menubar';
import Footer from '../components/commons/Footer';

function BoardLayout() {

    return (
        <>  
            <Manuber/>
            <Outlet/>
            <Footer/>
        </>
    );
}

export default BoardLayout;