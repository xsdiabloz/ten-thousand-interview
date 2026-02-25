import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateForm from "./pages/CreateForm";
import FormEditor from "./pages/FormEditor";
import FormFiller from "./pages/FormFiller";
import FormResponses from "./pages/FormResponses";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/create" element={<CreateForm />} />
      <Route path="/forms/:id" element={<FormEditor />} />
      <Route path="/forms/:id/fill" element={<FormFiller />} />
      <Route path="/forms/:id/responses" element={<FormResponses />} />
    </Routes>
  );
}

export default App;
