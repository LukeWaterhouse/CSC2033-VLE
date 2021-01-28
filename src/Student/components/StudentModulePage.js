import React, { Component, useState } from "react";
import { db } from "../../firebase";
import ReactMarkdown from "react-markdown";

/**
 * Created by: Mantas Aleskevicius
 * CSS: Mantas Aleskevicius
 * This file displays module description
 */

function DescriptionShow({ moduleName }) {
  const ModuleRef = db
    .collection("Courses")
    .doc("Computer Science")
    .collection("modules")
    .doc(moduleName);

  const [initDes, setInitDes] = useState("");
  ModuleRef.get()
    .then((snapshot) => {
      setInitDes(snapshot.data().description);
    })
    .catch((err) => {
      console.log("Error getting documents", err);
    });

  return (
    <div className="descriptionShow_preview">
      <ReactMarkdown className="markdownField" source={initDes} />
    </div>
  );
}

class StudentModulePage extends Component {
  render() {
    return (
      <div className="modulePageS">
        <h2>{this.props.moduleName}</h2>
        <DescriptionShow moduleName={this.props.moduleName} />
      </div>
    );
  }
}

export default StudentModulePage;
