import React from 'react';

export const Loading = () => {
    return (
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', height: '100%'}}>
            <img src='/img/loading.gif' alt='로딩중'/>
        </div>
    );
};

export default Loading;