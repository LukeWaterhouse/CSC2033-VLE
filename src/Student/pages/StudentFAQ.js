import React, {useState} from 'react'

import StudentNavBar from "../NavBar/StudentNavBar";
import 'bootstrap/dist/css/bootstrap.css'
import 'popper.js'
import '../css-files/disccusionBoard.css'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import 'firebase/firestore'
import {db,auth} from '../../firebase'
global.jQuery = require('jquery');
require('bootstrap');








function ChatRoom(){

    const messagesRef = db.collection('messages')
    const query = messagesRef.orderBy('createdAt').limit(25)

    const [messages] = useCollectionData(query, {idField: 'id'})
    const [formValue,setFormValue] = useState('')

    const sendMessage = async(e) => {
        const today = new Date()
        e.preventDefault()
        await messagesRef.add({
            text: formValue,
            createdAt: today.toLocaleDateString()+" "+ today.toLocaleTimeString()
        })

        setFormValue('')
    }


    return(
        <>
        <div>

            {messages ?.map(message => <ChatMessage key={message.id} message={message}/>)}
        </div>

            <div className="card card-body post-editor">

                <div className="panel-body">

                    <form onSubmit={sendMessage}>
                        <textarea className="form-control post-editor-input" value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
                        <button  className="btn btn-success post-editor-button" type="submit">Post</button>


                    </form>


                </div>


            </div>




            </>




    )
}



function ChatMessage({message}){
    const {text,createdAt} = message
    return <p className="card card-body post-editor">{text} {createdAt}</p>
}


function StudentFAQ(){

    return(
        <div>
            <StudentNavBar/>
            <h1 className="text-center">Discussion Board</h1>
            <ChatRoom/>
        </div>
    )
}

export default StudentFAQ