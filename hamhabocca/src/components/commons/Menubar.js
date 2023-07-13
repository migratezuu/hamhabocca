import { NavLink, useNavigate } from 'react-router-dom';
import style from './Menubar.module.css';
import { useDispatch } from 'react-redux';

function Menubar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const activeStyle = {
        boxShadow: 'inset 0 -10px 0 white'
    }

    const onClickLogoutHandler = () => {
        window.localStorage.removeItem('jwtToken');
        
        alert('로그아웃이 되어 메인화면으로 이동합니다.');
        navigate("/", { replace: true })
        window.location.reload();
    }

    const mypageOrLogout = () => {

        const pathname = window.location.pathname;
        const token = window.localStorage.getItem('jwtToken');

        if(pathname == '/mypage' && token != null) {
            return <button onClick={onClickLogoutHandler}  style={{width: '150px', height: '100%', color: '#056DFA', backgroundColor: 'white', fontSize: '20px', fontWeight: '700', border: 'none'}}>로그아웃</button>
        } else if(token != null) {
            return <NavLink to='/mypage'>마이페이지</NavLink>
        } else {
            return <NavLink to='/login'>로그인</NavLink>
        }
    }

    return (
        <nav className={style.wrap}>
            <div className={style.container}>
                <ul className={style.Rally}>
                    <li className={style.ssibal}><NavLink to='/'><img src='/img/Logo.png' className={style.logo}/></NavLink></li>
                    <li><NavLink to='/rally' style={ ({isActive}) => isActive? activeStyle: undefined }>랠리모집</NavLink></li>
                    <li><NavLink to='/review' style={ ({isActive}) => isActive? activeStyle: undefined }>랠리후기</NavLink></li>
                </ul>
                <ul className={style.Other}>
                    <li><NavLink to='/notice' style={ ({isActive}) => isActive? activeStyle: undefined }>공지</NavLink></li>
                    <li><NavLink to='/qna' style={ ({isActive}) => isActive? activeStyle: undefined }>건의</NavLink></li>
                    <li>{mypageOrLogout()}</li>
                </ul>
            </div>
        </nav>

    );
}

export default Menubar;