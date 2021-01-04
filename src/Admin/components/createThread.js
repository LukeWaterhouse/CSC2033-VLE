import React, { useState } from 'react';
import {db} from "../../firebase";

function CreateThread(){

    const [formValue,setFormValue] = useState('')
    const threadRef = db.collection('Threads')

    const createThread = async (e) => {
        e.preventDefault()
        await threadRef.doc(formValue).set({
            Title: formValue
        })

    }

    return(
        <div>
            Create Thread
            <form onSubmit={createThread}>
                <textarea value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default CreateThread