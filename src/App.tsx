import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreateMeeting from "./pages/CreateMeeting";
import MeetingDetail from "./pages/MeetingDetail";
import SelectDate from "./pages/SelectDate";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SelectDate />} />
      <Route path="/create" element={<CreateMeeting />} />
      <Route path="/meeting/:id" element={<MeetingDetail />} />
    </Routes>
  );
}
