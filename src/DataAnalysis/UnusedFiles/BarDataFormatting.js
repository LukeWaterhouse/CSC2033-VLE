import findMedian from "../Median";
import findQuartiles from "../Quartiles";
import { db } from "../../firebase";

/**
 * Created by: Harry Clifford
 * This file formats the assignment data passed from ButtonList to create data suitable for a bar graph
 */

// Returns data formatted to be displayed on a bar graph with appropriate lines for averages uses a default mark
// as this code was made before user login
function BarFormat(Assignments) {
    if (Assignments.length === 0){
        return null
    }
    let MarkLists = Assignments.MarkLists;
    let newData = []
    for (let i = 0; i < MarkLists.length; i++) {
        let MarkList = MarkLists[i].MarkList;
        let Title = MarkLists[i].Title;
        let MaxMark = MarkLists[i].MaxMark;
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
    return (newData)
}

// Returns the percentage acheieved relative to the maximum available
function Percentage(achieved, max) {
    var percentage = (achieved / max) * 100;
    percentage = +percentage.toFixed(2);
    return percentage;
}

export default BarFormat