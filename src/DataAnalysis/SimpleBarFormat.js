import findMedian from "./Median";
import findQuartiles from "./Quartiles";
import { db } from "../firebase";

/**
 * Created by: Harry Clifford
 *
 */

function BarFormat(data) {
    if (data[0] === undefined){
        return []
    }
    console.log(data, data[0])
    let newData = []
    for (let i = 0; i < data.length; i++) {
        let MarkList = data[i].MarkList;
        MarkList = MarkList.sort(compareFunction)
        let Title = data[i].Title;
        let MaxMark = data[i].MaxMark;
        let median = findMedian(MarkList)
        let quartiles = findQuartiles(MarkList, median[1], MarkList.length);
        let mean = 0;
        for (let x = 0; x < MarkList.length; x++) {
            mean += MarkList[x]
        }
        mean = mean / MarkList.length
        mean = Percentage(mean, MaxMark)
        let Mark = 20;
        Mark = Percentage(Mark, MaxMark)
        newData.push({
            Title: Title, Median: Percentage(median[0], MaxMark), Mark: Mark,
            UQ: Percentage(quartiles[1][0], MaxMark), LQ: Percentage(quartiles[0][0], MaxMark), Mean: mean
        })
    }
    console.log(newData)
    return (newData)
}

function userMark(){
    let Mark = "";
    //Code for getting the user's specific mark may go here
    return Mark
}

function Percentage(achieved, max) {
    var percentage = (achieved / max) * 100;
    percentage = +percentage.toFixed(2);
    return percentage;
}

function compareFunction(a, b) {
    return a - b;
}

export default BarFormat