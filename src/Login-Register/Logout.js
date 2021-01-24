import fire from "../firebase";
import Signup from "./Signup";

export default function Logout() {
    const handleLogout = () => {
        fire.auth().signOut().then(function()
        {
            console.log("signed out");
        }, function(error) {
            console.error("error occurred");
        }
        )
    }
    handleLogout()

    return (
        <div>
            <Signup/>
        </div>
    )
}