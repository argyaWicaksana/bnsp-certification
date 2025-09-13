import { Routes, Route, Navigate } from "react-router";
import { SidebarLayout } from '@/layouts/SidebarLayout';
import '@/App.css';
import { ArchivePage } from "@/pages/ArchivePage";
import { ArchiveAddPage } from "@/pages/ArchiveAddPage";
import { ArchiveViewPage } from "./pages/ArchiveViewPage";
import { LoginPage } from "@/pages/LoginPage";
import PrivateRoute from "@/components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import { CategoryPage } from "./pages/CategoryPage";
import { CategoryAddPage } from "./pages/CategoryAddPage";
import { CategoryEditPage } from "./pages/CategoryEditPage";
import { AboutPage } from "./pages/AboutPage";

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

          <Route path="categories">
            <Route index element={<CategoryPage />} />
            <Route path="create" element={<CategoryAddPage />} />
            <Route path=":categoryId" element={<CategoryEditPage />} />
          </Route>

            <Route path="about" index element={<AboutPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
