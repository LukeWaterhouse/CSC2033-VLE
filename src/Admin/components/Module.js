import React from "react";

class Module extends React.Component {
    render() {
        const {id, name, mLeader}= this.props;
        return (
            <div className="module">
                <div className="moduleId"> {id} </div>
                <div className="moduleName"> {name} </div>
                <div className="moduleMLeader"> {mLeader} </div>
            </div>
        );
    }
}

export default Module;