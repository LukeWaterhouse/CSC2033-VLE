import React from "react";
import AdminNavBar from "../NavBar/AdminNavBar";
import Threads from "../components/Threads";
import CreateThread from "../components/createThread";
import DeleteThread from "../components/deleteThread";

/**
 * Created by: Luke Waterhouse
 * This is the page for admin threads which shows the different threads as links to go to them as well as the
 * create and delete thread components which are only available on the admin side.
 */

function AdminThreads() {
  return (
    <div>
      <AdminNavBar />
      <CreateThread />
      <DeleteThread />
      <Threads />
    </div>
  );
}

export default AdminThreads;
