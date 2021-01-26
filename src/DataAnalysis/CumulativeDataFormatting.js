// Assumes an input of a list of marks and outputs data usable by recharts
import findMedian from "./Median";
import findQuartiles from "./Quartiles";

function Format(data){
    var marks = data.MarkList.sort(compareFunction);
    var maxMarks = data.Marks
    var totalStudents = marks.length;
    var median = findMedian(marks);
    var quartiles = findQuartiles(marks, median[1], totalStudents);
    var i;
    var x = 0;
    var cumulativeData = []
    for (i = 0; i <= maxMarks;) {
        if (marks[x] == i) {
            x++;
            if (x == marks.length){
                cumulativeData.push({ Mark: i, StudentsAchieved: (totalStudents-x),
                    Median: (median[1]+1), LQ: (quartiles[0][1]+1), UQ: (quartiles[1][1]+1)});
                i++; 
                var z;
                for (z = i+1; z <= maxMarks; z++){
                    cumulativeData.push({ Mark: z, StudentsAchieved: (totalStudents-x),
                        Median: (median[1]+1), LQ: (quartiles[0][1]+1), UQ: (quartiles[1][1]+1)});
                }
                break
            }
        }else{
            cumulativeData.push({ Mark: i, StudentsAchieved: (totalStudents-x),
                Median: (median[1]+1), LQ: (quartiles[0][1]+1), UQ: (quartiles[1][1]+1)});
            i++;
        }
    }
    return [cumulativeData, totalStudents, maxMarks]
}

function compareFunction(a, b){
    return (a-b);
}

export default Format