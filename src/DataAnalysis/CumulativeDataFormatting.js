// Assumes an input of a list of marks and outputs data usable by recharts
function Format(data){
    var marks = data.AllMarks.sort(compareFunction);
    var maxMarks = data.AvailableMarks;
    var totalStudents = marks.length;
    var median = findMedian(marks);
    var quartiles = findQuartiles(marks, median[1], totalStudents);
    console.log(quartiles)
    var i;
    var x = 0;
    var cumulativeData = []
    for (i = 0; i <= maxMarks;) {
        if (marks[x] == i) {
            x++;
            if (x == marks.length){
                cumulativeData.push({ Mark: i, StudentsAchieved: (totalStudents-x),
                    Median: (median[1]+1), LQ: (quartiles[0]+1), UQ: (quartiles[1]+1)});
                i++; 
                var z;
                for (z = i+1; z <= maxMarks; z++){
                    cumulativeData.push({ Mark: z, StudentsAchieved: (totalStudents-x),
                        Median: (median[1]+1), LQ: (quartiles[0]+1), UQ: (quartiles[1]+1)});
                }
                break
            }
        }else{
            cumulativeData.push({ Mark: i, StudentsAchieved: (totalStudents-x),
                Median: (median[1]+1), LQ: (quartiles[0]+1), UQ: (quartiles[1]+1)});
            i++;
        }
    }
    console.log(cumulativeData)
    return cumulativeData
}

function compareFunction(a, b){
    return (a-b);
}

function findMedian (array){
    var trueMedian = 0;
    var middleLocation = 0;
    if ((array.length % 2) == 0){
        middleLocation = (array.length/2)-0.5;
        trueMedian = (array[(array.length/2)-1]+array[array.length/2])/2;
    }else{
        trueMedian = array[(array.length/2)-0.5];
    }

    return [trueMedian, middleLocation]
}

function findQuartiles (array, median, totalStudents){
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
    return [trueLQ[1], trueUQ[1]]
}

export default Format