import React from "react";
import { db } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";

function Threads() {
  const ThreadsRef = db.collection("Threads");
  const [Threads] = useCollectionData(ThreadsRef, { idField: "id" });

  return (
    <div>
      <h1>Threads</h1>
      {Threads?.map((thread) => (
        <Thread key={thread.id} ThreadTitle={thread} />
      ))}
    </div>
  );
}

function Thread({ ThreadTitle }) {
  const { Title } = ThreadTitle;
  const pathTitle = "/StudentDiscussion/" + Title;
  return (
    <div className="card-header">
      <h5>
        <Link to={pathTitle}>{Title}</Link>
      </h5>
    </div>
  );
}

export default Threads;
