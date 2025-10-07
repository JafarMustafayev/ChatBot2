import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ChatPage from "./pages/ChatPage";
import MainLayout from "./components/Layout/MainLayout";
import SettingsPage from "./pages/SettingsPage";
import ImagesPage from "./pages/ImagesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<ChatPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/images" element={<ImagesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
