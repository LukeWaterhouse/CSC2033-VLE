import React from "react";
import AdminNavBar from "../NavBar/AdminNavBar";
import tempModules from "../../DataAnalysis/TempModules"
import Module from "../components/Module";
import {useState} from "react";

const moduleTypes = tempModules.map(module => (module.id))

function ModuleGroup() {
    const [active, setActive] = useState(moduleTypes[0]);
    return (
        <>
            <div className="module">
                {moduleTypes.map((type) => (
                    <button
                        className="moduleTab"
                        key={type}
                        active={active === type}
                        onClick={() => setActive(type)}
                    >
                        {type} {tempModules.map(module => ((module.id === type) ? module.name:null))}
                    </button>
                ))}
            </div>
            <div className="moduleContent">
                <div className="moduleContent_leader">Module Leader : {tempModules.map(module => ((module.id === active) ? module.mLeader:null))}</div>
                <div className="moduleContent_studentLabel">Students : </div>
                <div className="moduleContent_studentsWrapper">{tempModules.map(module => ((module.id === active) ? (
                    <ul className="moduleContent_students">{module.students.map(student => (
                        <li className="moduleContent_students">{student}</li>
                    ))}</ul>
                ):null))}</div>
            </div>
        </>
    );
}

class AdminClasses extends React.Component {


    constructor() {
        super();

        this.state = {
            showModules: false,
        }

        this.showModules = this.showModules.bind(this);
    }

    showModules(event){
        event.preventDefault();
        this.setState({showModules:true,});
    }



    render() {
        return (
            <div>
                <AdminNavBar />
                <h2>Admin Classes</h2>
                <ModuleGroup/>
                <button onClick={this.showModules}>
                    View Module
                </button>

                {

                    this.state.showModules ?
                        (
                            <div className="modules">
                                <p>name</p>
                                {tempModules.map(module => (<Module
                                    id={module.id}
                                    name={module.name}
                                    mLeader={module.mLeader}
                                />))}
                            </div>


                        ) : (null)
                }
            </div>
        );
    }
}

export default AdminClasses;
