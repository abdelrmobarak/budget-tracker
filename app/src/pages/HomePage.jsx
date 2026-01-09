import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return 'Good morning';
  }

  if (hour < 18) {
    return 'Good afternoon';
  }

  return 'Good evening';
}

export default function HomePage() {
  const greeting = getGreeting();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const tick = () => setNow(new Date());
    const interval = setInterval(tick, 1000);
    tick();
    return () => clearInterval(interval);
  }, []);

  const timeLabel = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateLabel = now.toLocaleDateString([], {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-4xl flex-col justify-center space-y-10 font-mono text-slate-900 transform-gpu transition-transform lg:scale-105 xl:scale-110 2xl:scale-125">
      <div className="grid gap-0 overflow-hidden rounded-xl border-4 border-slate-900 bg-white">
        <div className="bg-blue-600 px-6 py-4 text-white">
          <p className="text-xs uppercase tracking-[0.3em]">Monthly Budget Tracker</p>
        </div>
        <div className="grid gap-4 px-6 py-6">
          <h1 className="text-3xl leading-tight md:text-4xl">{greeting}!</h1>
          <p className="max-w-xl text-sm">
            Let's keep you on track today!
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-4 rounded-xl border-4 border-blue-600 bg-white p-5 text-sm">
          <p className="text-xs uppercase tracking-[0.25em] text-blue-700">Quick Start</p>
          <div className="grid gap-3">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 border-2 border-green-600 bg-green-500" />
              <p>Log income or expenses.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 border-2 border-red-600 bg-red-500" />
              <p>Watch the chart update.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 border-2 border-blue-600 bg-blue-500" />
              <p>Adjust entries with quick edits.</p>
            </div>
          </div>
          <Link
            className="inline-flex w-max items-center justify-center border-2 border-slate-900 bg-green-500 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-green-600"
            to="/budget-page"
          >
            Open Calculator
          </Link>
        </div>

        <div className="grid gap-4 rounded-xl border-4 border-red-600 bg-white p-5 text-sm">
          <p className="text-xs uppercase tracking-[0.25em] text-red-700">Time and Date</p>
          <div className="grid gap-3">
            <div className="flex items-center justify-between border-2 border-slate-900 bg-white px-3 py-2">
              <span>Time</span>
              <span className="text-blue-700">{timeLabel}</span>
            </div>
            <div className="flex items-center justify-between border-2 border-slate-900 bg-white px-3 py-2">
              <span>Date</span>
              <span className="text-green-700">{dateLabel}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
