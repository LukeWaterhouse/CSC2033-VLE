import findMedian from "./Median";
import findQuartiles from "./Quartiles";
import { db } from "../firebase";
import firebase from "firebase";
import {useDocumentData} from "react-firebase-hooks/firestore"
/**
 * Created by: Harry Clifford
 * Format's data to be displayed by Rechart's bar chart
 */

// Returns the formatted data for a bar chart
function BarFormat(data) {
  if (data[0] === undefined) {
    return [];
  }
  let userid = "";
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      userid = firebase.auth().currentUser.uid
      console.log(userid)
    } else {
      console.log("DATABASE ERROR");
    }
  });
  // Finds the averages for each individual assignment and adds them to an array
  let newData = [];
  for (let i = 0; i < data.length; i++) {
    let MarkList = data[i].MarkList;
    MarkList = MarkList.sort(compareFunction);
    let Title = data[i].Title;
    let MaxMark = data[i].MaxMark;
    let median = findMedian(MarkList);
    let quartiles = findQuartiles(MarkList, median[1], MarkList.length);
    let mean = 0;
    for (let x = 0; x < MarkList.length; x++) {
      mean += MarkList[x];
    }
    mean = mean / MarkList.length;
    mean = Percentage(mean, MaxMark);
    let Mark = UserMark(data, userid);
    if (Mark === "Admin"){
      newData.push({
        Title: Title,
        Median: Percentage(median[0], MaxMark),
        UQ: Percentage(quartiles[1][0], MaxMark),
        LQ: Percentage(quartiles[0][0], MaxMark),
        Mean: mean,
      });
    }else{
      Mark = Percentage(Mark, MaxMark);
      newData.push({
        Title: Title,
        Median: Percentage(median[0], MaxMark),
        Mark: Mark,
        UQ: Percentage(quartiles[1][0], MaxMark),
        LQ: Percentage(quartiles[0][0], MaxMark),
        Mean: mean,
      });
    }
  }
  return newData;
}

function UserMark(data, userid) {
  let Mark = 0;
  const SubRef = db.collection("Courses")
      .doc("Computer Science")
      .collection("modules")
      .doc(data.module)
      .collection("Assignments")
      .doc(data.Title)
      .collection("Submissions")
      .doc(firebase.auth().currentUser.uid)
  const [submission] = useDocumentData(SubRef);
  Mark = submission.Grade
  return Mark;
}

// Returns the percentage acheieved relative to the maximum available
function Percentage(achieved, max) {
  var percentage = (achieved / max) * 100;
  percentage = +percentage.toFixed(2);
  return percentage;
}

// When used with sort returns a numerically ordered list from lowest to highest
function compareFunction(a, b) {
  return a - b;
}


export default BarFormat;
