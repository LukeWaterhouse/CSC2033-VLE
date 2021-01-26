import fire from "../firebase";
import Signup from "./Signup";

export default function Logout() {
  const handleLogout = () => {
    fire
      .auth()
      .signOut()
      .then(() => {
        console.log("signed out");
      })
      .catch((error) => {
        console.error("error occurred");
        console.log(error);
      });
  };
  handleLogout();

  return <Signup />;
}
