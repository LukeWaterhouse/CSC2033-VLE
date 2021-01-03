import React from "react";
import {db,auth} from '../../firebase'
import firebase from "firebase";
import {useCollectionData} from 'react-firebase-hooks/firestore'
import DiscussionBoard from "./DiscussionBoard";
import {render} from "@testing-library/react";
import {Link} from "react-router-dom";
import StudentDiscussionBoard from "../pages/StudentDiscussionBoard";






function Threads() {

    const ThreadsRef = db.collection('Threads')
    const [Threads] = useCollectionData(ThreadsRef, {idField: 'id'})
    console.log(Threads)


    return(
        <div>
            <h1>Threads</h1>
            {Threads ?.map(thread => <Thread key={thread.id} ThreadTitle={thread}/>)}

        </div>
    )

}


function Thread({ThreadTitle}){


    const {Title} = ThreadTitle
    const pathTitle = "/StudentDiscussion/"+Title
    return(

        <div>
            <Link to={pathTitle}>{Title}</Link>


        </div>
    )
}


export default Threads