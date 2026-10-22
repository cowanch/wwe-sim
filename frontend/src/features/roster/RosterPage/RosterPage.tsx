import "bootstrap/dist/css/bootstrap.min.css";
import { Tab, Tabs } from "react-bootstrap";
import SuperstarTable from "./components/SuperstarTable";
import TagTeamTable from "./components/TagTeamTable";
import "./RosterPage.scss";

export default function RosterPage() {
  return (
    <Tabs defaultActiveKey="male" className="roster-tabs">
      <Tab eventKey="male" title="Male">
        <SuperstarTable gender="M" />
      </Tab>
      <Tab eventKey="female" title="Female">
        <SuperstarTable gender="F" />
      </Tab>
      <Tab eventKey="tag-team" title="Tag Team">
        <TagTeamTable />
      </Tab>
    </Tabs>
  );
}
