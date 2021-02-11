
import React from "react";



function Insertionsort(originalData){


    //Creates own copy of data, rather than maniuplating the original data
    let data = [...originalData];
    let steps = stepsGenerator(data);

    return steps;

}export default Insertionsort;


//Goes through the array, generating the instance of the array at each step and returns an array containing these instances in chronological order.
//i = first iterator
//j = second iterator where to insert
function stepsGenerator(data){
    let steps = [];
    for (let i = 1; i < data.length; i++) {
        let change = [];
        let current = data[i]; //split between sorted/unsorted list
        let j = (i-1);
        let temp = data;
        while ((j > -1) && (current < data[j])) {
            temp[j + 1] = temp[j]; //insert element
            j--;
        }
        temp[j + 1] = current;

        data = temp;
        change = [j+1];
            steps.push([
            [...data],
            [...change]
        ]);
    }
    let change = [];
    steps.push([
        [...data],
        [...change]
    ]);
    return steps;
}


/*
function Insertionsort(data){
    let steps = [];
    let original = data;
    for (let i = 0; i < data.length; i++){
        let temp = data[i];
        for (let j = (i -1; j >= 0 && (data[j]) > temp; j--)){
            data[j+1] = data[j];
        }
    }
    data [j+1]

}*/

//https://www.geeksforgeeks.org/binary-insertion-sort/
