import React, {Component} from 'react';
import './StudentNavBar.css'
import MenuItems from "./StudentMenuItems";


class StudentNavBar extends Component {
    state = {clicked: false}

    render() {
        return(
            <nav className="NavbarItems">
                <h1 className="navbar-logo" >Student Navigation</h1>
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

export default StudentNavBar