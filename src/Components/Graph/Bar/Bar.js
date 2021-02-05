function Bar(props) {
    let key = props.key;
    let i = props.value;
    let decoration = props.decoration;

    console.log("decoratiom: " + decoration)

    if (decoration == "bars"){
        return(
            <svg width="1" height={getBarHeight(i)} className={"arraybar"}>
                <rect width="400" height={getBarHeight(i)} style={{
                    height: `${getBarHeight(i)}em`, fill: `${getColour(key++, [], props.complete)}` //[] = the focus variable
                }} />
            </svg>)
    }else{
        return (
            <div >
                <h1>{" " + i + ", "}</h1>
            </div>
        )
    }


}export default Bar


//Returns blue if the data at hand is a focus/
function getColour(index, focus, complete){
    console.log("get colour complete var: " + complete)
    if (complete){
        console.log("complete")
        return "green"
    }else{
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

}

//Calculates appropriate bar height depending on how many algorithms are being compared.
function getBarHeight(i) {
    return i;
}
