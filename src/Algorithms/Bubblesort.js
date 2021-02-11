import React from 'react';


function Bubblesort(originalData) {
    let data = [...originalData];
    let steps = [];
    let focus = [];
    console.log("data in bubble: " + data)
    steps.push([...data]);
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < data.length; i++) {
            let focus = [i, i+1];
            if (data[i] > data[i + 1]) {
                let temp = data[i];
                data[i] = data[i + 1];
                data[i + 1] = temp;
                swapped = true;




                //steps.push([...data])

            }
            steps.push([
                [...data],
                [...focus]
            ]);
        }
    } while (swapped);

    focus = [];
    steps.push([
        [...data],
        [...focus]
    ]);
    console.log("BUBBLE STEPS: " + steps[0])
    return steps;
}export default Bubblesort
