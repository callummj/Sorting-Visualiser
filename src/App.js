import './App.css';

import React from 'react';
import Controlbar from "./Components/Toolbars/Controlbar";
import Algorithmbar from "./Components/Toolbars/Algorithmbar";
import Graph from "./Components/Graph/Graph";


import Bubblesort from "./Algorithms/Bubblesort";
import SelectionSort from "./Algorithms/Selectionsort";

export default class App extends React.Component {


    constructor() {
        super();
        this.state = {
            data: [],
            sort: false,
            algorithms: [],
        }
    }

    componentDidMount() {
        this.generateData();
    }



    generateData = () =>{
        let data = [];
        for (let i = 0; i < 20; i++){
            data.push(Math.floor(Math.random() * 100)+1);
        }

        this.setState({data: data});

        if (this.state.algorithms.length > 0){
            this.state.algorithms.forEach(i=>{
                i.steps = this.getSteps(i.algorithm, this.state.data)
            })
        }
        this.setState({sort: false})
    }

    startSort = (msg) =>{
        this.setState({sort: true})
    }


    /*
    addAlgorithm = (algorithm) =>{
        let temp = this.state.algorithms;
        let alreadyContains = false;
        let containedSteps = [];

        for (let i = 0; i < temp.length; i++){
            if (temp[i].algorithm === algorithm){
                if (temp[i].dataVer === this.state.dataVer) {
                    alreadyContains = true;
                    containedSteps = temp[i].steps;
                }
            }
        }

        if (!alreadyContains) {
            temp.push({algorithm: algorithm, dataVer: this.state.dataVer, steps: this.getSteps(algorithm, [...this.state.data])}) //[  [  [alg1 title], [alg1, step1], [alg1,step2]   ,   [alg2 title], [alg2, step1], [alg2,step2]  ] ....
            this.setState({algorithms: temp});
        } else {
            temp.push({algorithm: algorithm, dataVer: this.state.dataVer, steps: containedSteps}) //[  [  [alg1 title], [alg1, step1], [alg1,step2]   ,   [alg2 title], [alg2, step1], [alg2,step2]  ] ....
            this.setState({algorithms: temp});
            //alert("You have already selected this algorithm")
        }
    }
*/

    addAlgorithm = (algorithm) =>{
        let temp = this.state.algorithms;
        temp.push({algorithm: algorithm, steps: this.getSteps(algorithm, [...this.state.data])})
        this.setState({algorithms: temp});
    }


    removeAlgorithm = (algorithm) =>{
        console.log("remove algorithm")
        let temp = [];
        for (let i = 0; i < this.state.algorithms; i++){
            if (this.state.algorithms[i].algorithm != algorithm) {
                temp.push(this.state.algorithms[i]);
            }
        }
        this.setState({algorithms: temp});
    }



    getSteps = (algorithm, data) =>{
        console.log("alg: " + algorithm)
        switch (algorithm) {
            case "Bubble Sort":
                return Bubblesort(data);
            case "Selection Sort":
                return SelectionSort(data);
        }
    }

    stopSort = () =>{
        this.state.sort = false;
    }


    render() {

        return(
            <div>
                <Controlbar generateDataCallback = {this.generateData} startSortCallback = {this.startSort}/>




                <Algorithmbar onAddAlgorithm={this.addAlgorithm}/>

                {/*<h1>Data: {this.state.data}</h1>*/}


                {/*<h2>Graph:</h2>*/}

                {(this.state.algorithms.map(i => (
                    <div>
                        <h2>{i.algorithm}</h2>
                        <Graph steps = {[i][0].steps /*index 0 being the starting step (unsorted array) so then when animating should be: [i][0][j]*/} sort = {this.state.sort} stopSort = {this.stopSort} removeAlgorithm = {this.removeAlgorithm} title = {i.algorithm}/>
                    </div>
                )))}
            </div>
        );

    }
}