import Graph from "./Data";
import CumulativeFrequencyGraph from "./CumulativeFrequency";
import BarChart from "./BarChart";
import data from "./CurrentData";

let labels = [
    { key: "Median", color: "#3700B3"},
    { key: "Mean", color: "#03DAC6"},
    { key: "UQ", color: "#FFC61A"},
    { key: "LQ", color: "#00E600"}
];

let cumulativeLabels = [
    { key: "Median", color: "#3700B3"},
    { key: "UQ", color: "#FFC61A"},
    { key: "LQ", color: "#00E600"}
];

export default function GraphDisplaying(){
    let output = "";
    if (data.getGraph() === "Line"){
        return(
            <CumulativeFrequencyGraph
                data={data.getData()}
                labels={cumulativeLabels}/>
        )
    }else{
        return(
            <BarChart
            data={data.getData()}
            labels={labels}/>
        )
    }
}