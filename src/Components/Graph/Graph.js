import {useState, useRef, useEffect} from 'react';
import Bar from "./Bar/Bar";
import './Graph.css'

export default function Graph(props){

    let steps = props.steps;
    let [complete, setComplete] = useState(false);
    let [sort, setSort] = useState(props.sort)
    let [index, setIndex] = useState(0);
    let speed = props.speed;


    //Start the sort
    if ( (sort == false) && (props.sort == true) ){
        setSort(true);
    }else if ( (sort == true) && (props.sort == false) ){
        setSort(false);
    }



    // Use useRef for mutable variables that we want to persist
    // without triggering a re-render on their change


    const requestRef = useRef();
    const previousTimeRef = useRef();



    useEffect(() => {
        const animate = time => {
            if (previousTimeRef.current != undefined) {
                const deltaTime = time - previousTimeRef.current;
                setIndex(prevIndex => (prevIndex + 1));
            }
            previousTimeRef.current = time;
            requestRef.current = requestAnimationFrame(animate);
        }

        if (sort == true && !complete){
            requestRef.current = requestAnimationFrame(animate);
            if (index == steps.length-1){
                setComplete(true);
            }
            return () => cancelAnimationFrame(requestRef.current);
        }

    }, );



    let dataToPass = steps[index];


    //Because of how requestAnimationFrame works, it will loop over one more time
    if (dataToPass == undefined){
        dataToPass = steps[index-1];
    }




    return (
        <div id = {props.graphID}>
            {speed}
            {drawBars(dataToPass, props, props.title, props.decoration, complete)}
        </div>
    )

}

const drawBars = (data, props, algorithm, decoration, complete) => {

    let focus = [];

    //Has a focus
    if (data.length == 2){

        focus = data[1];
        data = [...data[0]]
        // data = [...dta
    }
    let height = data[0].max + " px";

    let key = 0;

    const bars = data.map((value, index) =>
        <>
            <Bar index={index} value = {value} decoration = {decoration} complete = {complete} focus = {focus}/>
        </>

    );

    if (decoration == "bars"){
        return(
            <div className={"bars-wrapper"} style={{height: {height}}}>
                <h1>{"Completed: " + complete}</h1>
                <button className={"close-button"} value={algorithm} onClick={()=>props.removeAlgorithm(props.graphID)}>x</button>
                <div className={"bars"} style={{
                    height: `${(Math.max(data))}`}}>
                    {bars}
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
