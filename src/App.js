import './App.css';

import React from 'react';
import Controlbar from "./Components/Toolbars/Controlbar";
import Algorithmbar from "./Components/Toolbars/Algorithmbar";
import Graph from "./Components/Graph/Graph";


import Bubblesort from "./Algorithms/Bubblesort";
import SelectionSort from "./Algorithms/Selectionsort";
import Heapsort from "./Algorithms/Heapsort"
import Insertionsort from "./Algorithms/Insertionsort";
import MergeSortDriver from "./Algorithms/Mergesort";
import Quicksort from "./Algorithms/Quicksort";
import Radixsort from "./Algorithms/Radixsort";


import Bottombar from "./Components/Toolbars/Bottombar";

//www.npmjs.com/package/nanoid
import { nanoid } from 'nanoid'
import ResultsTable from "./Components/Results/ResultsTable";

export default class App extends React.Component {


    constructor() {
        super();
        this.state = {
            data: [],
            sort: false,
            algorithms: [],
            speed: 75,
            decoration: "bars",
            graphID: 0, //Keeps track of latest graph ID which has been assigned
            reset : false,
            finishingOrder: [], //Keeps track of when an algorithm has finished (used in stopSort())
            finishingCounter: 0,
            resetCounter: 0,
            pause: false,
            testCount: 0,
        }
    }

    componentDidMount() {
        this.generateData();
    }



    generateData = () =>{
        this.setState({sort: false})

        if (this.state.algorithms.length > 0){
            this.setState({reset: true})
        }

        let data = [];
        for (let i = 0; i < 100; i++){
            data.push(Math.floor(Math.random() * 100)+1);
        }


        this.setState({data: data});

        this.state.algorithms.forEach(i=>{
            //i.steps = this.getSteps(i.algorithm, this.state.data)
           // temp.push({algorithm: algorithm, steps: this.getSteps(algorithm, [...this.state.data]), graphID: this.state.graphID+1})

            let [...steps] = this.getSteps(i.algorithm, data);
            console.log("NEW STEPS: " + steps + " with len: " + steps.length);
            i.steps = steps;
            //TODO for temp fix, change above line to: i.steps = this.getSteps(i.algorithm, data) but does not work properly
        })
    }

    resetCompleted = () =>{
        let tempResetCounter = this.state.resetCounter + 1;
        this.setState({resetCounter: tempResetCounter})
        console.log("reset complete func: " + tempResetCounter)

        if (this.state.resetCounter >= this.state.algorithms.length){
            this.setState({reset: false})
        }
    }

    startSort = () =>{
        this.setState({sort: true})
    }

    stopSort = (algorithm, swaps) =>{


        //TO GET THIS TO WORK: CHANGE STATE STOPCOUNTER TO finishingOrder

        this.setState({finishingCounter: this.state.finishingCounter + 1})

        console.log("stop sort: " +this.state.finishingCounter + "/" + this.state.algorithms.length)
        if (this.state.finishingCounter == this.state.algorithms.length){
            this.setState({sort: false})
        }
        /*
        if (this.state.finishingOrder.length == this.state.algorithms.length){
            this.setState({sort: false});
        }*
        /*

        let result = {name:algorithm, swaps:swaps};
        let result2 = this.state.finishingOrder;
        result2.push(result); //conactonating order

        this.setState({test: algorithm})



        //TODO THIS IS CAUSING CONSTANT SORTING
        this.setState({
            //finishingOrder: result2,
        })


        console.log("finishing order: " + this.state.finishingOrder)
        //Check if all algorithms have finished
        if (this.state.finishingOrder.length == this.state.algorithms.length){
           this.setState({sort: false});
        }*/
        /*
        let temp = this.state.stopCounter + 1;
        console.log("lenght: " + this.state.algorithms.length)
        this.setState({sort: false})


        /*
        console.log("stop sorting")

        let temp = this.state.stopCounter + 1;
        console.log("lenght: " + this.state.algorithms.length)
        this.setState({sort: false})*/

    }


    clear = () => {
        this.setState({algorithms: []})
    }
    addAlgorithm = (algorithm) =>{
        let temp = this.state.algorithms;
        temp.push({algorithm: algorithm, steps: this.getSteps(algorithm, [...this.state.data]), graphID: this.state.graphID, key: this.generateKey()})

        this.setState(prevstate => ({
                algorithms: temp,
                graphID: prevstate.graphID + 1,}
            ));
    }


    //Removes the X algorithm from the viusaliser, using their ID
    removeAlgorithm = (graphID) =>{
        console.log("removing: "  + graphID)
        const newAlgorithms = this.state.algorithms.filter(i =>
            i.graphID !== graphID,
        );

        this.setState({algorithms: newAlgorithms})

    }



    //Gets and returns precomputed steps for each algorithm
    getSteps = (algorithm, data) =>{
        console.log("getsteps data: " + data);
        switch (algorithm) {
            case "Bubble Sort":
                return Bubblesort(data);
            case "Heap Sort":
                return Heapsort(data);
            case "Insertion Sort":
                console.log("steps to return: " + Insertionsort(data))
                let steps = Insertionsort(data)
                return steps;
            case "Quick Sort":
                return Quicksort(data);
            case "Radix Sort":
                return Radixsort(data);
            case "Merge Sort":
                return MergeSortDriver(data);
            case "Selection Sort":
                return SelectionSort(data);
        }
    }



    updateSpeed = (newSpeed) =>{
        this.setState({speed: newSpeed});
    }

    changeDecoration = () =>{
        if (this.state.decoration == "bars"){
            this.setState({decoration: "numerics"})
        }else if (this.state.decoration == "numerics"){
            this.setState({decoration: "bars"})
        }
    }


    togglePlayPause = () =>{
        if (this.state.pause == true){
            this.setState({pause: false})
        }else{
            if (this.state.sort == false){
                this.setState({sort: true})
            }
            this.setState({pause: true})
        }
    }

    generateKey = () =>{
        const [id] = nanoid();
        return id;
    }


    getResultsTable = () =>{
        if (this.state.finishingOrder.length > 0 ){
            console.log("RESULTS TABLE")
            return <h1>Finished</h1>
            return <ResultsTable results = {this.state.finishingOrder}/>
        }
    }

    render() {


        return(
            <div>
                <Controlbar generateDataCallback = {this.generateData} startSortCallback = {this.startSort} clearCallback = {this.clear}/>


                <Algorithmbar onAddAlgorithm={this.addAlgorithm}/>

                <h3>{"Reset: " + this.state.reset}</h3>
                <div id={"sorting-area"}>


                    {(this.state.algorithms.map(i => (

                        <div >
                            <h2>{i.algorithm}</h2>


                            <Graph
                                key={i.key}
                               startData = {this.state.data}
                               steps = {[i][0].steps}
                               sort = {this.state.sort}
                               stopSort = {this.stopSort} removeAlgorithm = {this.removeAlgorithm}
                               title = {i.algorithm} speed = {this.state.speed} decoration ={this.state.decoration}
                                graphID = {i.graphID}
                                reset={this.state.reset}
                                resetCompletedCallback = {this.resetCompleted}
                                pause = {this.state.pause}
                            />
                            {/*/*index 0 being the starting step (unsorted array) so then when animating should be: [i][0][j]*/}
                        </div>
                    )))}
                </div>



                <h1>test: {this.state.test}</h1>

                {this.getResultsTable}


                <Bottombar updateSpeedCallback = {this.updateSpeed} toggleDecoration = {this.changeDecoration} playPauseCallback = {this.togglePlayPause} skip = {() => this.skip()}/>
            </div>
        );

    }
}
