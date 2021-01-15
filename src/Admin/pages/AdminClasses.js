import React from "react";
import AdminNavBar from "../NavBar/AdminNavBar";
import tempModules from "../../DataAnalysis/TempModules"
import Module from "../components/Module";
import {useState} from "react";
import "../css-files/AdminClasses.css"

const moduleTypes = tempModules.map(module => (module.id))

function ModuleGroup() {
    const [active, setActive] = useState(moduleTypes[0]);
    return (
        <>
            <div className="module">
                {moduleTypes.map((type) => (
                    <button
                        key={type}
                        active={active === type}
                        onClick={() => setActive(type)}
                        className= {active === type ? "moduleTabC": "moduleTab"}
                    >
                        {type} {tempModules.map(module => ((module.id === type) ? module.name:null))}
                    </button>
                ))}
            </div>
            <div className="moduleContent">
                <div className="moduleContentWrapperT">
                    <div className="moduleContent_leader">Module Leader : {tempModules.map(module => ((module.id === active) ? module.mLeader:null))}</div>
                </div>
                <div className="moduleContentWrapperS">
                    <div className="moduleContent_studentLabel">Students</div>
                    <div className="moduleContent_studentWrapper">{tempModules.map(module => ((module.id === active) ? (
                        <ul className="moduleContent_students">{module.students.map(student => (
                            <li className="moduleContent_student">{student}</li>
                        ))}</ul>
                    ):null))}</div>
                </div>
                <div className="moduleContent_assignments"></div>
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
        this.setState({showModules:!this.state.showModules,});
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
