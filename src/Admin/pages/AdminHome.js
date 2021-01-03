import React from 'react'
import AdminNavBar from "../NavBar/AdminNavBar";
import CSS from "../css-files/AdminHome.css"

class AdminHome extends React.Component {
    render() {
        return (
            <div>
                <AdminNavBar/>
                <h2>Admin Home</h2>

            </div>
        )
    }
}

export default AdminHome