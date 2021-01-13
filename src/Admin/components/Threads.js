import React from "react";
import { db } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";

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
    <div className="card-header border-white">
      <a className="text-warning">
        <h5>
          <Link to={pathTitle}>{Title}</Link>
        </h5>
      </a>
    </div>
  );
}

export default Threads;
