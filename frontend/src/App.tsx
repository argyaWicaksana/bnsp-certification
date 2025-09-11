import { Routes, Route, Navigate } from "react-router";
import { SidebarLayout } from '@/layouts/SidebarLayout';
import '@/App.css';
import { ArchivePage } from "@/pages/ArchivePage";
import { ArchiveAddPage } from "@/pages/ArchiveAddPage";
import { ArchiveViewPage } from "./pages/ArchiveViewPage";

function App() {
  return (
    <Routes>
      <Route element={<SidebarLayout />}>
        <Route index element={<Navigate to="/archives" replace />} />
        <Route path="archives">
          <Route index element={<ArchivePage />} />
          <Route path="create" element={<ArchiveAddPage />} />
          <Route path=":archiveId" element={<ArchiveViewPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
