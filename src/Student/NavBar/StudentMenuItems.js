import Logout from "../../Login-Register/Logout";

const MenuItems = [
  {
    title: "Home",
    url: "/StudentHome",
    cName: "nav-links",
    logout: "",
  },
  {
    title: "Modules",
    url: "StudentModules",
    cName: "nav-links",
    logout: "",
  },
  {
    title: "Deadlines",
    url: "StudentDeadlines",
    cName: "nav-links",
    logout: "",
  },
  {
    title: "Assignments",
    url: "/StudentAssignment",
    cName: "nav-links",
    logout: "",
  },
  {
    title: "Results",
    url: "StudentResults",
    cName: "nav-links",
    logout: "",
  },
  {
    title: "Forum",
    url: "/StudentThreads",
    cName: "nav-links",
    logout: "",
  },
  {
    title: "Feedback",
    url: "/StudentFeedback",
    cName: "nav-links",
    logout: "",
  },
  {
    title: "Logout",
    url: "/Signup",
    cName: "nav-links",
    logout: { Logout },
  },
];

export default MenuItems;
