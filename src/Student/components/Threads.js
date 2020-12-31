import React from "react";
import {db,auth} from '../../firebase'
import firebase from "firebase";
import {useCollectionData} from 'react-firebase-hooks/firestore'






function Threads() {

    const ThreadsRef = db.collection("Threads")
    const [Threads] = useCollectionData(ThreadsRef, {idField: 'id'})
    console.log(Threads)

    return(
        <div>

            {ThreadsRef}
        </div>
    )

}

export default Threads