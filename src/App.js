// App.js
import { Routes, Route } from "react-router-dom"
import { FormPage } from "./components/FormPage";
import { SuccessPage } from "./components/SuccessPage";
import { EntryPage } from "./components/EntryPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<FormPage />} />
      <Route path="/list" element={<SuccessPage />} />
      <Route path="/entry/:id" element={<EntryPage />} />
    </Routes>
  );
}