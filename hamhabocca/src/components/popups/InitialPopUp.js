import { useState } from "react";

function InitialPopUp() {

    const [checked, setChecked] = useState(false);
    
    const onCheckedHandler = () => {
        
        setChecked(!checked);
    }
    
    const onClickHandler = () => {

        if(checked) {

            let expire = new Date();
            expire = expire.setHours(expire.getHours() + 24);
            
            window.localStorage.setItem('hasVisitedBefore', expire);
        }

        window.close();
    }
    
    return (
        <>
            <img src="/img/initial_open_popup.png" alt="logo image"></img>
            <div style={{ textAlign: 'right', padding: '0 5px', backgroundColor: 'lightgray'}}>
                <label htmlFor="dismiss">하루동안 팝업 보지 않기</label>
                <input type="checkbox" id="dismiss" onChange={onCheckedHandler} style={{ marginRight: '10px'}}/>
                <button onClick={onClickHandler}>닫기</button>
            </div>
        </>
    )
}

export default InitialPopUp;