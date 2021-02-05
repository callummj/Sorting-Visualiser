import React from 'react';
import './UI Bars.css'

//Control bar for animation speed/type etc.
function Bottombar(props){

    /*
    <input type="range" min="1" max="100" className="slider" id={'speedController'} onInput={sliderController}/>
    */

    const updateSpeed = (e) =>{
        props.updateSpeedCallback(e.target.value);
    }

    const toggleDecoration = () =>{
        props.toggleDecoration();
    }
    return(

        <div id = {'bottombar'}>

            <h3 id={'speedLabel'}>Speed:</h3>
            <button onClick={updateSpeed} value={500}>Slow</button>
            <button onClick={updateSpeed} value={75}>Medium</button>
            <button onClick={updateSpeed} value={20}>Fast</button>
            <button onClick={toggleDecoration}>Change decoration</button>


        </div>
    )


}export default Bottombar;

