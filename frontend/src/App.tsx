import { Routes, Route, Navigate } from "react-router";
import { SidebarLayout } from '@/layouts/SidebarLayout';
import '@/App.css';
import { ArchivePage } from "@/pages/ArchivePage";
import { ArchiveAddPage } from "@/pages/ArchiveAddPage";
import { ArchiveViewPage } from "./pages/ArchiveViewPage";
import { LoginPage } from "@/pages/LoginPage";
import PrivateRoute from "@/components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute><SidebarLayout /></PrivateRoute>}>
          <Route index element={<Navigate to="/archives" replace />} />
          <Route path="archives">
            <Route index element={<ArchivePage />} />
            <Route path="create" element={<ArchiveAddPage />} />
            <Route path=":archiveId" element={<ArchiveViewPage />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
