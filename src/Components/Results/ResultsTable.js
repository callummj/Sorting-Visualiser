import {useState} from 'react';

export default function ResultsTable(props) {

    const results = props.results;
    /*

    results = [

    {
        Name: Quicksort,
        Swaps: 86,
    },

    {
        Name: Bubblesort,
        Swaps: 230,
    }


     */

    //If any algorithms have finished

        return(
            <table style="width:100%">
                <tr>
                    <th>Order</th>
                    <th>Algorithm name</th>
                    <th>Swaps</th>
                </tr>
                <tr>
                    <td>Jill</td>
                    <td>Smith</td>
                    <td>50</td>
                </tr>
            </table>
        )



}
