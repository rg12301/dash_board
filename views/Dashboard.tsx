import React, { ReactNode, useReducer } from "react";
import Navbar from "../components/Navbar";
import Sidepane from "../components/Sidepane";
import AdvertsDisplay from "../components/displays/AdvertsDisplay";
import DashboardDisplay from "../components/displays/DashboardDisplay";
import ArticlesDisplay from "../components/displays/ArticlesDisplay";
import UsersDisplay from "../components/displays/UsersDisplay";
import MembersDisplay from "../components/displays/MembersDisplay";
import FeedbackDisplay from "../components/displays/FeedbackDisplay";
import ReportsDisplay from "../components/displays/ReportsDisplay";
import NotificationsDisplay from "../components/displays/NotificationsDisplay";

interface Props {}

export interface Display {
  view: ReactNode;
}

const displayReducer = (
  state: Display,
  action: { type: string }
): Display => {
  switch (action.type) {
    case "DASHBOARD":
      return { view: <DashboardDisplay /> };
    case "USERS":
      return { view: <UsersDisplay /> };
    case "MEMBERS":
      return { view: <MembersDisplay /> };
    case "ARTICLES":
      return { view: <ArticlesDisplay /> };
    case "FEEDBACK":
      return { view: <FeedbackDisplay /> };
    case "REPORTS":
      return { view: <ReportsDisplay /> };
    case "NOTIFICATIONS":
      return { view: <NotificationsDisplay /> };
    case "ADVERTS":
      return { view: <AdvertsDisplay /> };
  }
  return state;
};

const Dashboard = (props: Props) => {
  const [display, dispatchDisplay] = useReducer(
    displayReducer,
    {
      view: <DashboardDisplay />,
    }
  );
  return (
    <div className="flex flex-row">
      <Sidepane changeDisplay={dispatchDisplay} />
      <div className="w-full flex flex-col">
        <Navbar />
        {display.view}
      </div>
    </div>
  );
};

export default Dashboard;
