import React, {useState} from "react";
import {db} from "../../firebase";


function DeleteThread(){

    const [formValue,setFormValue] = useState('')
    const ThreadsRef = db.collection('Threads')

    async function deleteThread() {
        await ThreadsRef.doc(formValue).delete()
        setFormValue('')
    }




    return(
        <div>
            Delete Thread
            <form onSubmit={deleteThread}>
                <input value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
                <button className="btn-danger" type="submit">Delete</button>
                <div>
                </div>
            </form>
        </div>
    )
}

export default DeleteThread