import { Navigate } from 'react-router-dom';
import { checkLoginStatusAPICalls } from '../apis/CheckLoginStatusAPICalls';
import style from './Notice.module.css';

function Notice() {

    if(checkLoginStatusAPICalls()) {

        alert("로그인 후 이용해주시길 바랍니다.");

        return <Navigate replace to={"/login"}/>
    }

    return (
        <main className={style.main}>
            <div className={style.container}>
                <div className={style.header}>
                <h2>Notice</h2>
                </div>
                <article className={style.category}>
                    <h4>최초작성일</h4>
                    <div>최종수정일</div>
                </article>
            </div>
        </main>
    );
}

export default Notice;