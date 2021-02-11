import React from 'react';
import './UI Bars.css'

import {useState} from 'react';

//Control bar for animation speed/type etc.
function Bottombar(props){

    /*
    <input type="range" min="1" max="100" className="slider" id={'speedController'} onInput={sliderController}/>
    */

    const [playPauseIcon, setPlayPauseIcon] = useState('pause');

    const playPause = () =>{
        if (playPauseIcon == "pause"){
            setPlayPauseIcon("play_arrow")
        }else if (playPauseIcon == "play_arrow"){
            setPlayPauseIcon("pause")
        }
        props.playPauseCallback();
    }



    const skip = (e) =>{
        props.skip(e.target.value)
    }
    const updateSpeed = (e) =>{
        props.updateSpeedCallback(e.target.value);
    }

    const toggleDecoration = () =>{
        props.toggleDecoration();
    }
    return(

        <div id = {'bottombar'}>

            <div id={'speed-controller'}>
                <h3 id={'speedLabel'}>Speed:</h3>
                <button onClick={updateSpeed} value={500}>Slow</button>
                <button onClick={updateSpeed} value={75}>Medium</button>
                <button onClick={updateSpeed} value={20}>Fast</button>
                <button onClick={toggleDecoration}>Change decoration</button>
            </div>
            <div id={'play-controller'}>
                <button onClick = {skip} value={"backwards"}><i className="material-icons">skip_previous</i></button>
                <button onClick = {playPause}><i className="material-icons">{playPauseIcon}</i></button>
                <button onClick={skip} value={"forwards"}><i className="material-icons">skip_next</i></button>
            </div>


        </div>
    )


}export default Bottombar;

