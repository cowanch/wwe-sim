import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import RosterPage from "./features/roster/RosterPage";

export default function App() {
  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/roster" replace />} />
          <Route path="/roster" element={<RosterPage />} />
        </Routes>
      </main>
    </>
  );
}
