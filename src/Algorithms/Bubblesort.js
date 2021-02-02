import React from 'react';


function Bubblesort(data) {
    let steps = [];
    steps.push([...data]);
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < data.length; i++) {
            if (data[i] > data[i + 1]) {
                let temp = data[i];
                data[i] = data[i + 1];
                data[i + 1] = temp;
                swapped = true;


                //steps.push([...data]);


                //steps.push([...data])

            }
            steps.push(
                [...data]
            );
        }
    } while (swapped);

    steps.push([...data]);
    return steps;
}export default Bubblesort
