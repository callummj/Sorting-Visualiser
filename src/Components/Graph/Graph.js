import {useState, useRef, useEffect} from 'react';
import Bar from "./Bar/Bar";
import './Graph.css'

export default function Graph(props){

    const startData = props.startData;
    let sortState = props.sort;

    let steps = props.steps;
    let [complete, setComplete] = useState(false);
    let [sort, setSort] = useState(sortState);
    let [index, setIndex] = useState(0);
    let [data, setData] = useState(startData);
    let speed = props.speed;






    // Use useRef for mutable variables that we want to persist
    // without triggering a re-render on their change


    const requestRef = useRef();
    const previousTimeRef = useRef();

    let step = steps[index]; //0=index


/*
    //Potentially useEffect to handle stopping sort.
    useEffect((()=>{
        //Start the sort
        if ( (sort == false) && (props.sort == true) ){
            setSort(true);
        }else if ( (sort == true) && (props.sort == false) ){
            setSort(false);
        }

    }))



    //Potentially useEffect to handle stopping sort.
    useEffect((()=>{
        //props.stopSort(props.title, steps.length);
        console.log("index check " + index+  " / " + steps.length)
        if (index == steps.length-1){
            console.log("setting complete")
            setComplete(true);
            setSort(false);
        }
    }), [index])

*/



    /*


    U S E   E  F  F  E  C  T    E X P L A I N E D:
    I have two useEffects, one which handles whether the sta


     */



    if ( (sort == false) && (props.sort == true) && (!complete)){
        setSort(true);
    }else if ( (sort == true) && (props.sort == false) ){
        setSort(false);
    }



    useEffect(()=>{
        if (complete){
            props.stopSort();
        }
    }, [complete])

    useEffect(() => {

        console.log("variables: " +"\nReset:" + props.reset+"\nSort: " + sort + "\nIndex: " + index)

        if (props.reset == true){
            setComplete(false);
            props.resetCompletedCallback();
            console.log("SETTING INDEX TO 0")
            setIndex(0);
        }

        const animate = time => {
            if ((sort == true) && (complete == false)){
                setIndex(prevIndex => (prevIndex + 1));
            }


            previousTimeRef.current = time;
            if (!complete){
                console.log("index in animate: " + index)
                requestRef.current = requestAnimationFrame(animate);
            }

        }

        if (sort == true && !complete){
            console.log("i stopped there")
            requestRef.current = requestAnimationFrame(animate);
            console.log("steps before complete" +  " " + index  + " " + steps.length)

            if (index == steps.length-1){
                console.log("complete")
                setComplete(true);
                setSort(false);
            }
            return () => cancelAnimationFrame(requestRef.current);
        }

    }, );

    let dataToPass = getDataToPass(props, setSort, setComplete, steps, index);

    console.log("data to pass: " + dataToPass + " index at: " + index + " steps length: " + steps.length + " for algorithm: " + props.title)
    return (
        <>
            {drawBars(dataToPass, props, props.title, props.decoration, complete)}
        </>
    )

}

const stopAnimation = (requestID) =>{
    return () => cancelAnimationFrame(requestID);
}

const getDataToPass = (props, setSort, setComplete, steps, index) =>{
    let dataToPass;
    //If generate data has been called
    if (props.reset == true){
        //Sort should be set to false from above
        //setIndex(0);
        dataToPass = props.startData;
        //setComplete(false);
    }else{
        dataToPass = steps[index];


        //Because of how requestAnimationFrame works, it will loop over one more time
        if (dataToPass == undefined){
            dataToPass = steps[index];
        }


    }

    return dataToPass;
}

//Method to calculate swaps
const getDataToPassg = (data, step) =>{
    let tempData = [...data]; //So we do not manipulate the original data
    let focus = step[0];
    let flag = step[1];
    for (let i = 0; i < tempData.length; i++) {
        let swapped = false;
        let focusCheck = focus[0];
        if (focusCheck === i) {
            if (flag === true) {

                //Get the two indexes and assign them a variable so it's more readable
                let indexOne = [focus[0]];
                let indexTwo = [focus[1]];


                let temp = data[indexOne];
                tempData[indexOne] = tempData[indexTwo];
                tempData[indexTwo] = temp;


                swapped = true;
            } else {
                // console.log("NOT SWAPPING")
            }
        }
    }
    return data;
}

function calculateGraph(data, step){
    let tempData = [...data];
    //console.log("tempdata: " + tempData)
    let focus = step[0];
    let flag = step[1];
    console.log("focus: " + focus + " and flag: " + flag)

    //console.log(flag === true)

    //console.log("Josh test1: " + typeof flag.valueOf());
    //console.log("Josh test2:" + typeof true);
    for (let i = 0; i < tempData.length; i++){
        let swapped = false;
        let focusCheck = focus[0];
        if (focusCheck === i){
            if (flag === true){
                // console.log("SWAPPING")
                //swap


                let indexOne = [focus[0]];

                let indexTwo = [focus[1]];


                console.log("index1: " + indexOne + " index2: " + indexTwo)
                let temp = data[indexOne];
                tempData[indexOne] = tempData[indexTwo];
                tempData[indexTwo] = temp;

                console.log("swapped: " + tempData[indexOne] + " and " + tempData[indexTwo])
                swapped = true;
            }else{
                // console.log("NOT SWAPPING")
            }
        }

    }
    return (tempData);
}


const drawBars = (data, props, algorithm, decoration, complete) => {

    let focus = [];

    //Has a focus
    if (data.length == 2){
        focus = data[1];
        data = [...data[0]]
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
