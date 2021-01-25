import fire from "../firebase";

export default function Logout() {
  const handleLogout = () => {
    fire
      .auth()
      .signOut()
      .then((r) => console.log("uh oh"));
  };

  return handleLogout();
}
