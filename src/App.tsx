import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LocaleProvider } from '@/lib/i18n'
import { LandingPage } from '@/pages/LandingPage'
import { CatalogPage } from '@/pages/CatalogPage'
import { AdminPage } from '@/pages/AdminPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

export default function App() {
  return (
    <LocaleProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/cours" element={<CatalogPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </LocaleProvider>
  )
}
