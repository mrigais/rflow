import React, { useEffect } from "react";

const Settings = (props) => {
    const {
        nodeText,
        setNodeText
    } = props;

    const onChange = (e) => {
        setNodeText(e.target.value);
    }

    return (
        <view style={{ margin: 10 }}>
            <input onChange={(e) => onChange(e)} type="text" value={nodeText} style={{ height: '5vh', width: '80%', marginTop: 10, fontSize: 20 }} />
        </view>
    )
}

export default React.memo(Settings); 