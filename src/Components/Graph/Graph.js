import React from 'react';
import {useState, useEffect} from 'react';
import './Graph.css'
import Bar from "./Bar/Bar";


function Graph(props) {
    let steps = props.steps;
    let complete = false;
    const [index, setIndex] = useState(0);
    let speed = props.speed;




    useEffect(() => {
        if (props.reset == true){
            setIndex(0);

        }
        if (props.sort == true){
            const interval = setInterval(() => {
                if (!(complete)) {
                    if (steps.length > index + 1) {
                        setIndex(index + 1)
                    } else {
                        props.stopSort()
                        complete = false;
                    }
                }
            }, speed);
            return () => clearInterval(interval); //deletes
        }

    });

    return (
        <div>
            {speed}
            {drawBars(steps[index], props, props.title, props.decoration, complete)}
        </div>
    )
}export default Graph

let animate = (index, setIndex, steps, props) =>{
    console.log("calling animate steps len: " + steps.length)
    for (let i = 0; i < steps.length; i++){

        setTimeout(function() {
            setIndex(index ++);
        }, 100*i);

        //setIndex(index++);
        console.log("index: " + index)
        //setTimeout(()=>(setIndex(index +1)), 10*i);
    }
    props.stopSort(); //Stops sort from being invoked again
}


/*

/*
const animiate = (steps, displayData, setDisplayData)=>{

    let sorted = false;
    do{
        for (let i = 0; i < steps.length; i++){
            setDisplayData(steps[i])
            /*
            setTimeout(function() {
                console.log("i: " + i)
                setDisplayData(steps[i])
            }, 1*i);
        }
        sorted = true;
    }while (!sorted)

}*/
/*
    console.log("oog boo " + props.sort)

    if (props.sort == true){
        for (let i = 0; i < steps.length; i++){

            console.log("ooga booga")
            setTimeout(()=>(setDisplayData(steps[i]), (10*i)))

        }
    }else{
        setDisplayData(steps[0])
    }

    console.log()
    return(
        <div>
            {drawBars(displayData, props)}
        </div>
    )
*/
    /*
    useEffect(() => {
        if (props.sort == true){


            const element = document.getElementById('bars');
            let start;

            function step(timestamp) {
                if (start === undefined)
                    start = timestamp;
                const elapsed = timestamp - start;

                // `Math.min()` is used here to make sure that the element stops at exactly 200px.
                element.style.transform = 'translateX(' + Math.min(0.1 * elapsed, 200) + 'px)';

                if (elapsed < 2000) { // Stop the animation after 2 seconds
                    window.requestAnimationFrame(step);
                }
            }

            for (let i = 0; i < steps.length-1; i++){
                setTimeout(function() {
                    setIndex(index+1)
                }, 10*i);

            }
        }
    });*/

/*
    return(
        <div>
            <h1>{"sort: " + props.sort}</h1>
            <button className={"close-button"} onClick={()=>handleClick}>x</button>
            <div className={"bars"} style={{
                height: `${getBarHeight(Math.max(steps[index]))}`}}>
                {
                    steps[index].map(i => (
                        <svg width="1" height={getBarHeight(i)} className={"arraybar"}>
                            <rect width="400" height={getBarHeight(i)} style={{
                                height: `${getBarHeight(i)}em`, fill: `${getColour(key++)}`
                            }} />
                        </svg>)

                    )}
            </div>
        </div>)
    /*
    return(
        <div>
            {drawBars(displayData, props)}
        </div>
    );
*/

    /*
    if (props.sort == false){
        return(
            <div>
                <h1>{"sort: " + props.sort}</h1>
                <button className={"close-button"} onClick={()=>handleClick}>x</button>
                <div className={"bars"} style={{
                    height: `${getBarHeight(Math.max(steps[index]))}`}}>
                    {
                        steps[index].map(i => (
                            <svg width="1" height={getBarHeight(i)} className={"arraybar"}>
                                <rect width="400" height={getBarHeight(i)} style={{
                                    height: `${getBarHeight(i)}em`, fill: `${getColour(key++)}`
                                }} />
                            </svg>)

                        )}
                </div>
            </div>)
    }else{

        return (animate(props, steps, setSteps, index, setIndex) )

    }
*/

/*
function drawBars(data, props, algorithm){

    let handleRemove = (e) => {
        console.log("remov thing")
        props.removeAlgorithm(e.target.value);
    }


    let key = -1;

    console.log("reutrn + " + data)
    return(
        <div id = {"sort"}>
            <h1>{"sort: " + props.sort}</h1>
            <button className={"close-button"} value={algorithm} onClick={()=>props.removeAlgorithm(props.title)}>x</button>
            <div className={"bars"} style={{
                height: `${getBarHeight(Math.max(data))}`}}>
                {
                    data.map(i => (


                        <svg width="1" height={getBarHeight(i)} className={"arraybar"}>
                            <rect width="400" height={getBarHeight(i)} style={{
                                height: `${getBarHeight(i)}em`, fill: `${getColour(key++)}`
                            }} />
                        </svg>)

                    )}
            </div>
        </div>
    );
}

*/

function drawBars(data, props, algorithm, decoration, complete){



    let key = -1;


    if (decoration == "bars"){
        return(
            <div id = {"sort"}>
                <h1>{"sort: " + props.sort}</h1>
                <button className={"close-button"} value={algorithm} onClick={()=>props.removeAlgorithm(props.graphID)}>x</button>
                <div className={"bars"} style={{
                    height: `${(Math.max(data))}`}}>{
                    data.map(i => (
                        <Bar value = {i} decoration = {decoration} key = {key} complete = {complete}/>
                    ))}
                </div>
            </div>
        );
    }else if (decoration == "numerics"){
        return(
            <div id = {"sort"}>
                <h1>{"sort: " + props.sort}</h1>
                <button className={"close-button"} value={algorithm} onClick={()=>props.removeAlgorithm(props.graphID)}>x</button>
                <div className={"numerics"} style={{
                    height: `${(Math.max(data))}`}}>{
                    data.map(i => (
                        <Bar value = {i} decoration = {decoration} key = {key}/>
                    ))}
                </div>
            </div>
        );
    }

}


/*

//Returns blue if the data at hand is a focus/
function getColour(index, focus){
    if(Array.isArray(focus)){
        for (let i =0; i < focus.length; i++){
            console.log("focus: " + focus[i] + " " + index)
            if (focus[i] === index){
                return "blue"
            }
        }
    }

    return "orange";
}

//Calculates appropriate bar height depending on how many algorithms are being compared.
function getBarHeight(i) {
    return i;
}

 */
