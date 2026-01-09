import { HashRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BudgetPage from './pages/BudgetPage';

function Nav() {
  return (
    <nav className="mb-10 flex flex-wrap gap-3 text-sm">
      <Link className="rounded-full border px-4 py-2 text-emerald-100" to="/homepage">
        Home
      </Link>
      <Link className="rounded-full border px-4 py-2 text-emerald-100" to="/budget-page">
        Budget
      </Link>
    </nav>
  );
}
export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-slate-100">
          <Nav />
          <header className="mb-12">
            <Routes>
              <Route path="/homepage" element={<HomePage />} />
              <Route path="/budget-page" element={<BudgetPage />} />
              <Route path="*" element={<Navigate to="/homepage" replace />} />
            </Routes>
          </header>
      </div>
    </HashRouter>
  );
}
