import {useEffect} from 'react'
import Storage from './storage';

const ProgressBar = ({file, setFile})=>{
    const {url, progress} = Storage(file);
    useEffect(() => {
    if(url){
        setFile(null)
    }
    }, [url,setFile])
    return (
        <div className='progress-bar' 
        style={{width:progress+'%'}}
        ></div>
    )
}

export default ProgressBar
