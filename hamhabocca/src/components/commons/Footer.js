import style from "./Footer.module.css"

function Footer() {

    return (

        <footer className={style.footer}>
            <div className={style.container}>
                <div className={style.logo}>
                    <img src="/img/footer_logo.png"></img>
                </div>
                <div className={style.contents}>
                    <div className={style.href}>
                        <ul>
                            <li><a href='#' target='_black'>약관</a></li>
                            <li><a href='#' target='_black'>개인정보</a></li>
                            <li><a href='#' target='_black'>사이트맵</a></li>
                        </ul>
                    </div>
                    <div className={style.info}>
                        <span>사업자등록번호: 000-00-00000</span>
                        <span>프로젝트 팀 함해보까</span>
                        <span>Email : hamhabocca@gmail.com</span>
                        {/* <span>개인정보 책임자 : 함보까</span> */}
                    </div>
                    <div className={style.copy}>
                        Copyright 2023. team-greedy. all rights reserved.
                    </div>
                </div>
            </div>
        </footer>

    );
}

export default Footer;