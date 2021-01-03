import React from "react";
import {db,auth} from '../../firebase'
import firebase from "firebase";
import {useCollectionData} from 'react-firebase-hooks/firestore'

import {Link} from "react-router-dom";






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
    const pathTitle = "/AdminDiscussion/"+Title
    return(

        <div>
            <Link to={pathTitle}>{Title}</Link>
        </div>
    )
}


export default Threads