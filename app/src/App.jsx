import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AddStudent from "./AddStudent";
import AssignTask from "./AssignTask";
import Tasks from "./Tasks";
import ManageStudent from "./ManageStudent";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./Dashboard"; // ✅ add

function App() {
  return (
    <Router>
      <Routes>

        {/* LOGIN PAGE */}
        <Route path="/" element={<Login />} />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* PROTECTED ROUTES */}
        <Route
          path="/manage-student"
          element={
            <ProtectedRoute>
              <ManageStudent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-student"
          element={
            <ProtectedRoute>
              <AddStudent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-student/:id"
          element={
            <ProtectedRoute>
              <AddStudent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/assign-task"
          element={
            <ProtectedRoute>
              <AssignTask />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;