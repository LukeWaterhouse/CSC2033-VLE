import React, {Component} from 'react';
import MenuItems from "./AdminMenuItems";
import './AdminNavBar.css'


class AdminNavBar extends Component {
    state = {clicked: false}

    render() {
        return(
            <nav className="NavbarItems">
                <h1 className="navbar-logo" >Admin Navigation</h1>
                <div className="menu-icon">

                </div>
                <ul>
                    {MenuItems.map((item, index) => {
                        return(
                            <li key={index}>
                                <a className={item.cName} href={item.url}>
                                    {item.title}
                                </a>

                            </li>
                        )
                    })}

                </ul>
            </nav>
        )
    }
}

export default AdminNavBar