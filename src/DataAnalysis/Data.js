import Format from "./CumulativeDataFormatting";
import findMedian from "./Median";
import findQuartiles from "./Quartiles";
import { db } from "../firebase";

class Data{
  constructor(props) {
    this.Data = this.initialData()
    this.Graph = "Overall"
  }
  getData(){
    return this.Data
  }
  getGraphType(){
    return this.GraphType
  }
  initialData(){
    let tempData = []
    let modules = []
    let assignments = []
    db.collection("Courses")
        .doc("Computer Science")
        .collection("modules")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            const data = doc.data();
            modules.push(data.Title)
          });
        })
    for (let i = 0; i < modules.length; i++) {
      db.collection("Courses")
          .doc("Computer Science")
          .collection("modules")
          .doc(modules[i])
          .collection("Assignments")
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              const data = doc.data();
              if (assignments.Graded === true) {
                assignments.push({Title: data.Title, MarkList: data.MarkList})
              }
            });
          })
    }
    for (let i = 0; i < assignments.length; i++) {
      let MarkList = assignments.MarkList;
      let Title = assignments.Title
      tempData.push(this.BarData(MarkList, Title))
    }
    return tempData;
  }
  BarData(MarkList, Title){
      let median = findMedian(MarkList)
      let quartiles = findQuartiles(MarkList, median[1], MarkList.length)
      let mean = 0
      for (let x = 0; x < MarkList.length; x++) {
        mean += MarkList[x]
        mean = mean / MarkList.length
        return {Title: Title, Median: median[0], UQ: quartiles[1][0], LQ: quartiles[0][0], Mean: mean}
      }
  }
  BarButton(Assignments){
    let MarkLists = Assignments.MarkLists;
    let newData = []
    for (let i = 0; i < MarkLists.length; i++){
      let MarkList = MarkLists[i].MarkList
      let Title = MarkLists[i].Title
      let median = findMedian(MarkList)
      let quartiles = findQuartiles(MarkList, median[1], MarkList.length)
      let mean = 0
      for (let x = 0; x < MarkList.length; x++){
        mean += MarkList[x]
      }
      mean = mean / MarkList.length
      newData.push({Title: Title, Median: median[0],
        UQ: quartiles[1][0], LQ: quartiles[0][0], Mean: mean})
    }
    return(newData)
  }
  LineButton(Assignment){
    return(Format(Assignment))
  }
  ButtonType(Assignment){
    let data = []
    if (Assignment.MarkLists !== undefined){
      data = this.BarButton(Assignment)
      this.Graph = "Bar"
    }else{
      data = this.LineButton(Assignment)
      this.Graph = "Line"
    }
    this.Data = data
  }

}

export default Data

