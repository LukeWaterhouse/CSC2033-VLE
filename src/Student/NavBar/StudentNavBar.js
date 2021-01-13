import React, { Component } from "react";
import "./StudentNavBar.css";
import MenuItems from "./StudentMenuItems";
import Logo from "../../Images/WolfPack.png";

class StudentNavBar extends Component {
  state = { clicked: false };

  render() {
    return (
      <nav className="NavbarItems">
        <div className="menu-icon">
          <img src={Logo} />
        </div>
        <ul>
          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <a className={item.cName} href={item.url}>
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}

export default StudentNavBar;
