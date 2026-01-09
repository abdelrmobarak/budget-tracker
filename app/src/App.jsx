import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BudgetPage from './pages/BudgetPage';

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-100 px-6 py-10 text-slate-900">
        <div className="mx-auto w-full max-w-5xl">
          <header className="mb-12">
            <Routes>
              <Route path="/homepage" element={<HomePage />} />
              <Route path="/budget-page" element={<BudgetPage />} />
              <Route path="*" element={<Navigate to="/homepage" replace />} />
            </Routes>
          </header>
        </div>
      </div>
    </HashRouter>
  );
}
