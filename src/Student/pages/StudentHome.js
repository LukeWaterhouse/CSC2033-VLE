import React from 'react'
import {db,auth} from '../../firebase'
import StudentNavBar from "../../Student/NavBar/StudentNavBar";

class StudentHome extends React.Component {
    state = {
        students: null}

    componentDidMount() {
        console.log("mounted");
        db.collection('schools').get()
            .then(snapshot => {
                const schools = []
                snapshot.forEach(doc => {
                    const data = doc.data()
                    schools.push(data)
                })
                this.setState({schools: schools})
                console.log(snapshot)

            })
            .catch(error => console.log(error))
    }

    render() {
        return (

            <div className="App">
                <h2>StudentHome</h2>

                {
                    this.state.schools &&
                    this.state.schools.map( school =>{
                        return(
                            <div>
                                <p>{school.title}</p>
                                <p>{school.desc}</p>
                            </div>
                        )
                    })
                }

            </div>
        );
    }
}

export default StudentHome
