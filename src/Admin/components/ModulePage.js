import React, { Component, useEffect, useState } from "react";
import { db } from "../../firebase";
import DeleteModule from "./deleteModule";
import ReactMarkdown from "react-markdown";

/**
 * Created by: Mantas Aleskevicius
 * CSS: Mantas Aleskevicius
 * This file displays module description and allows user to change it with markDown
 */

function DescriptionShow({ moduleName }) {
  const ModuleRef = db
    .collection("Courses")
    .doc("Computer Science")
    .collection("modules")
    .doc(moduleName);
  const [description, setDescription] = useState("");

  //Pulling the description of the module from the database
  useEffect(() => {
    ModuleRef.get()
      .then((snapshot) => {
        setDescription(snapshot.data().description);
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  }, []);

  //Updates the description in the database
  const textCreate = async (e) => {
    e.preventDefault();

    await ModuleRef.update({
      description: description,
    });
  };

  //Return a preview of the description and a form to change it
  return (
    <div className="descriptionShow">
      <div className="descriptionShow_preview">
        <div className="descriptionShow_previewTitle">Preview</div>
        <ReactMarkdown className="markdownField" source={description} />
      </div>
      <form className="descriptionShow_form" onSubmit={textCreate}>
        <button className="descriptionShow_formButton" type="submit">
          Done
        </button>
        <textarea
          className="descriptionShow_formText"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </form>
    </div>
  );
}

//Displays module's information
class ModulePage extends Component {
  render() {
    return (
      <div className="modulePage">
        <h2>{this.props.moduleName}</h2>
        <DeleteModule thisId={this.props.moduleName} />
        <DescriptionShow moduleName={this.props.moduleName} />
      </div>
    );
  }
}

export default ModulePage;
