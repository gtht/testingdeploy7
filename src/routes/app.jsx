import DashboardPage from "views/Dashboard/Dashboard.jsx";
import TableList from "views/CodeCombat/CodeCombat.jsx";

import {
  Dashboard,
  BubbleChart,
} from "material-ui-icons";

const appRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Classroom Analytics",
    navbarName: "Classroom Analytics",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/codecombat",
    sidebarName: "CodeCombat Analytics",
    navbarName: "CodeCombat Analytics",
    icon: BubbleChart,
    component: TableList
  },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default appRoutes;
