import { Outlet } from 'react-router-dom';
import Footer from '../components/commons/Footer';
import Header from '../components/commons/Header';
import HomeMenubar from '../components/commons/HomeMenubar';

function HomeLayout() {

    return (
        <>  
            <Header/>
            <HomeMenubar/>
            <Outlet/>
            <Footer/>
        </>
    );
}

export default HomeLayout;