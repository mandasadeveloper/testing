import React from 'react'
import {useParams} from 'react-router-dom';
function Video() {
    const {index} = useParams();
    return (
        <div>
           {index}
        </div>
    )
}

export default Video
