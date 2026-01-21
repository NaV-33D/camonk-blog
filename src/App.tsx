import { Navigate, Route, Routes } from 'react-router-dom'

import { AppShell } from '@/components/layout/AppShell'
import { BlogDetailPage } from '@/features/blogs/pages/BlogDetailPage'
import { BlogHomePage } from '@/features/blogs/pages/BlogHomePage'
import { NewBlogPage } from '@/features/blogs/pages/NewBlogPage'

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Navigate to="/blogs" replace />} />
        <Route path="/blogs" element={<BlogHomePage />}>
          <Route path=":id" element={<BlogDetailPage />} />
        </Route>
        <Route path="/new" element={<NewBlogPage />} />
        <Route path="*" element={<Navigate to="/blogs" replace />} />
      </Route>
    </Routes>
  )
}

export default App
