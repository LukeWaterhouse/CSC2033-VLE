/**
 * Created by: Harry Clifford
 *
 */

export default function findMedian (array){
    var trueMedian = 0;
    var middleLocation = 0;
    if ((array.length % 2) == 0){
        middleLocation = (array.length/2)-0.5;
        trueMedian = (array[(array.length/2)-1]+array[array.length/2])/2;
    }else{
        middleLocation = (array.length/2)-0.5
        trueMedian = array[(array.length/2)-0.5];
    }

    return [trueMedian, middleLocation]
}