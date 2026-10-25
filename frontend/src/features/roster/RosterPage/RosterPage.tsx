import "bootstrap/dist/css/bootstrap.min.css";
import { Tab, Tabs } from "react-bootstrap";
import SuperstarTable from "./components/SuperstarTable";
import TagTeamTable from "./components/TagTeamTable";
import "./RosterPage.scss";
import BrandTable from "./components/BrandTable";

export default function RosterPage() {
  return (
    <Tabs defaultActiveKey="male" className="roster-tabs">
      <Tab eventKey="raw" title="RAW">
        <BrandTable brand="RAW" />
      </Tab>
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
