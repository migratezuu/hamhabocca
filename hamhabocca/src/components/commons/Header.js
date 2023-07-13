import HomeSearchFilter from "./HomeSearchFilter";
import style from './Header.module.css';

function Header() {

    return (
        <header className={style.Header}>
            <img src='./img/Dalibocca_logo.png' alt='main logo' className={style.Logo} />
            <label className={style.ThatText}>간단하고 편하게 랠리를 검색해보세요!</label>
            <HomeSearchFilter />
        </header>
    );
}

export default Header;