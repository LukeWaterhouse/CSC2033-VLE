import React from "react";
import { db } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

/**
 * Created by: Luke Waterhouse
 * This file pulls the Threads collection from the database and maps through them passing each one to a Thread
 * component which displays its name as clickable links to take you to the different thread pages (using router variables)
 */

//this function pulls all the Threads from the database and
function Threads() {
  const ThreadsRef = db
    .collection("Courses")
    .doc("Computer Science")
    .collection("Threads");
  const [Threads] = useCollectionData(ThreadsRef, { idField: "id" });

  return (
    <div>
      <h1 className="text-sm-center">Threads</h1>
      {Threads?.map((thread) => (
        <Thread key={thread.id} ThreadTitle={thread} />
      ))}
    </div>
  );
}

function Thread({ ThreadTitle }) {
  const { Title } = ThreadTitle;
  const pathTitle = "/AdminDiscussion/" + Title;
  return (
    <div className="card-header border-white border-top text-md-center">
      <a className="text-warning">
        <h5>
          <Button variant="secondary" style={{ background: "#424242" }}>
            <Link style={{ color: "white" }} to={pathTitle}>
              {Title}
            </Link>
          </Button>
        </h5>
      </a>
    </div>
  );
}

export default Threads;
