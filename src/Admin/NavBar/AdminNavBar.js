import React, { Component } from "react";
import MenuItems from "./AdminMenuItems";
import "./AdminNavBar.css";
import Logo from "../../Images/WolfPack.png";
import Logout from "../../Login-Register/Logout";
import Button from "react-bootstrap/Button";

class AdminNavBar extends Component {
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
              <li className="navBarList" key={index}>
                <a className={item.cName} href={item.url}>
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
        <a onClick={Logout} href="/" style={{ marginBottom: "12px" }}>
          <Button>Logout</Button>
        </a>
      </nav>
    );
  }
}

export default AdminNavBar;
