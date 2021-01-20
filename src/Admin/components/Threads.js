import React from "react";
import { db } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";


function Threads() {
  const ThreadsRef = db
    .collection("Courses")
    .doc("Computer Science")
    .collection("Threads");
  const [Threads] = useCollectionData(ThreadsRef, { idField: "id" });
  console.log(Threads);

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
          <Button variant="secondary" style={{background:"#424242"}}>
            <Link style={{color:"white"}} to={pathTitle}>{Title}</Link>
          </Button>
        </h5>
      </a>
    </div>
  );
}

export default Threads;
