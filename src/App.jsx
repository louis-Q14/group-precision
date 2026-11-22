import './App.css'
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { queryClientInstance } from '@/lib/query-client'
import { AuthProvider } from '@/lib/AuthContext';
import ScrollToTop from '@/lib/ScrollToTop';
import PageNotFound from '@/lib/PageNotFound';
import { pagesConfig } from './pages.config'

const { Pages, Layout, mainPage } = pagesConfig;
const MainPage = Pages[mainPage];

const LayoutWrapper = ({ children, currentPageName }) => Layout
  ? <Layout currentPageName={currentPageName}>{children}</Layout>
  : <>{children}</>;

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route
              path="/"
              element={<LayoutWrapper currentPageName={mainPage}><MainPage /></LayoutWrapper>}
            />
            {Object.entries(Pages).map(([path, Page]) => (
              <Route
                key={path}
                path={`/${path}`}
                element={<LayoutWrapper currentPageName={path}><Page /></LayoutWrapper>}
              />
            ))}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
