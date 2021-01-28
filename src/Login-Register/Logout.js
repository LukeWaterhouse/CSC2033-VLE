import fire from "../firebase";
import Signup from "./Signup";

export default function Logout() {
  const handleLogout = () => {
    //simply logs out the user when Logout is called
    fire
      .auth()
      .signOut()
      .then(() => {
        console.log("Signed Out");
      })
      .catch((error) => {
        console.error("error occurred");
        console.log(error);
      });
  };
  handleLogout();
  //and returns them to the signup screen.
  return <Signup />;
}
