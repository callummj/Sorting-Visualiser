import React from 'react';
import {useState, useEffect} from 'react';
import './Graph.css'
import Bar from "./Bar/Bar";


function Graph(props) {
    let steps = props.steps;
    let [complete, setComplete] = useState(false);
    let [sort, setSort] = useState(props.sort)
    const [index, setIndex] = useState(0);
    let speed = props.speed;

    useEffect(() => {



        if ((props.reset == true) &&(index != 0)){
            console.log("resetting")
            setIndex(0);
            setComplete(false)
            props.resetCompletedCallback();
        }

        /*
        if (reset == true && index != 0){
            alert("resetting index")
            setIndex(0);
            setReset = false;
        }*/


        //Sorting status for local array:
        //If
        if (props.sort){
            if (!complete){
                if (sort != true){
                    setSort(true)
                }
            }else if (complete){
                props.stopSort()
                setSort(false)
            }
        }

        console.log("algorithm: " + props.title + " index: " + index)
        console.log("length of steps: " + steps.length + " with index 0: " + steps[0])

        //if props.sorting
            //if not complete
                //if sort != true


        /*

        OLD

        //If not complete and continue to sort
        if (!complete && sort){
            const interval = setInterval(() => {
                console.log("compolete: " + complete)
                if (!(complete)) {
                    if (steps.length > index + 1) {
                        setIndex(index + 1)
                    } else {
                        console.log("should stop sort")
                        props.stopSort()
                        setSort(false);
                        setComplete(true);

                    }
                }
            }, speed);
            return () => clearInterval(interval); //deletes*/






            if (!complete && sort){
            const interval = setInterval(() => {
                return new Promise(resolve => {
                        console.log("compolete: " + complete)
                        if (!(complete)) {
                            if (steps.length > index + 1) {
                                setIndex(index + 1)
                            } else {
                                console.log("should stop sort")
                                props.stopSort()
                                setSort(false);
                                setComplete(true);
                            }
                        }
                    }
                )
            }, speed);
            return () => clearInterval(interval); //deletes
        }

    });


    console.log("reset: " + props.reset + " index: " + index)
    return (
        <div>
            {speed}
            {drawBars(steps[index], props, props.title, props.decoration, complete)}
        </div>
    )
}export default Graph



const drawBars = (data, props, algorithm, decoration, complete) => {

    let focus = [];

    //Has a focus
    if (data.length == 2){
        focus = data[1];
        data = [...data[0]]
        // data = [...dta
    }

    console.log("focus here: " + focus)
    let key = 0;


    console.log("data: " + data + " for " + props.title);


    let height = data[0].max + " px";
    if (decoration == "bars"){
        return(
            <div className={"bars-wrapper"} style={{height: {height}}}>
                <h1>{"Completed: " + complete}</h1>
                <button className={"close-button"} value={algorithm} onClick={()=>props.removeAlgorithm(props.graphID)}>x</button>
                <div className={"bars"} style={{
                    height: `${(Math.max(data))}`}}>{
                    data.map(i => (
                        <Bar value = {i} decoration = {decoration} key = {key++} complete = {complete} focus = {focus}/>
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
                        <Bar value = {i} decoration = {decoration} key = {key++} focus = {focus}/>
                    ))}
                </div>
            </div>
        );
    }

}
