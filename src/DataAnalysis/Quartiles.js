/**
 * Created by: Harry Clifford
 *
 */

import findMedian from "./Median";

export default function findQuartiles (array, median, totalStudents){
    var trueLQ = 0;
    var trueUQ = 0;
    if ((array.length % 2) == 0){
        var lowerRange = array.slice(0, (median+0.5));
        var upperRange = array.slice((median+0.5), array.length) ;
    }else{
        var lowerRange = array.slice(0, median);
        var upperRange = array.slice(median, array.length);
    }
    trueLQ = findMedian(lowerRange);
    trueUQ = findMedian(upperRange);
    trueUQ[1] = (trueUQ[1]+(totalStudents/2));
    return [trueLQ, trueUQ]
}