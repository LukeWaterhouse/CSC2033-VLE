import React from 'react'
import {db} from "../../firebase";
import {useState} from "react/cjs/react.production.min";

function CreateThread(){

    const threadRef = db.collection('Threads').doc("newThread").collection('messages')
    const [formValue,setFormValue] = useState('')
    const createThread = async (e) => {
        e.preventDefault()
        await threadRef.add({

        })


    }

    return(
        <div>
            Create Thread

            <form onClick={createThread}>
                <textarea value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default CreateThread