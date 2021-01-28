import React, {useEffect, useState} from 'react'
import {db} from "../../firebase";
import firebase from "firebase";
import Card from "react-bootstrap/Card";


export default function Welcome() {

    const [userName, setUsername] = useState("")

    useEffect( () => {
        db.collection("UserDetails").doc(firebase.auth().currentUser.uid).get().then(doc => {
            const username = doc.data().username
            setUsername(username)

        })

    })


    return(

        <div>
            <Card style={{background:"#424242"}}>
                <h3 style={{color:"white"}}>Welcome {userName}!</h3>
            </Card>
        </div>
    )
}