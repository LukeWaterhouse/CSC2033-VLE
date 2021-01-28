import findMedian from "./Median";

/**
 * Created by: Harry Clifford
 * Returns a 2D array with the Lower Quartiles value and position
 * and then the Upper Quartiles value and position
 */

// Returns a 2D array with the lower and upper quartiles information
export default function findQuartiles(array, median, totalStudents) {
  var trueLQ = 0;
  var trueUQ = 0;
  // Finds the correct sub array's to find the median of the correct halves of the data
  if (array.length % 2 == 0) {
    var lowerRange = array.slice(0, median + 0.5);
    var upperRange = array.slice(median + 0.5, array.length);
  } else {
    var lowerRange = array.slice(0, median);
    var upperRange = array.slice(median, array.length);
  }
  trueLQ = findMedian(lowerRange);
  trueUQ = findMedian(upperRange);
  trueUQ[1] = trueUQ[1] + totalStudents / 2;
  return [trueLQ, trueUQ];
}
