import React, { useState } from 'react';
import {db} from "../../firebase";
import {useCollectionData} from "react-firebase-hooks/firestore";

function CreateThread(){

    const [formValue,setFormValue] = useState('')
    const [visibility, setVisibility] = useState('invisible')
    const [errorMessage, setError] = useState('')
    const threadRef = db.collection('Threads')

    const ThreadsRef = db.collection('Threads')
    const [Threads] = useCollectionData(ThreadsRef, {idField: 'id'})

    const createThread = async (e) => {
        e.preventDefault()

        let isValid = true


        Threads.forEach(function (arrayItem){
            if (arrayItem.Title===formValue){
                isValid=false
                setError("There is already a thread with that name!")
            }
        })

        if (formValue===""){
            isValid=false
            setError("You must enter a thread name!")
        }


        if (isValid){
            setVisibility("invisible")
            setFormValue("")
            await threadRef.doc(formValue).set({
                Title: formValue
            })
        }else {
            console.log("Error!")
            setVisibility("visible")

        }


    }

    return(
        <div>
            Create Thread
            <form onSubmit={createThread}>
                <input value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
                <button className="btn-success" type="submit">Create</button>
                <div className={visibility}>
                    {errorMessage}
                </div>
            </form>
        </div>
    )
}

export default CreateThread