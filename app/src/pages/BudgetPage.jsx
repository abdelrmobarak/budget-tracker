import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import { ArcElement, Chart as ChartJS, Tooltip } from 'chart.js';

ChartJS.register(ArcElement, Tooltip);

export default function BudgetPage() {
  const [incomeName, setIncomeName] = useState('');
  const [incomePrice, setIncomePrice] = useState('');
  const [expenseName, setExpenseName] = useState('');
  const [expensePrice, setExpensePrice] = useState('');
  const [incomeItems, setIncomeItems] = useState([]);
  const [expenseItems, setExpenseItems] = useState([]);
  const visibleIncomeItems = incomeItems.slice(0, 3);
  const visibleExpenseItems = expenseItems.slice(0, 3);
  const extraIncomeCount = Math.max(incomeItems.length - visibleIncomeItems.length, 0);
  const extraExpenseCount = Math.max(expenseItems.length - visibleExpenseItems.length, 0);

  const incomeTotal = useMemo(function () {
    return incomeItems.reduce(function (sum, item) {
      return sum + item.price;
    }, 0);
  }, [incomeItems]);
  const expenseTotal = useMemo(function () {
    return expenseItems.reduce(function (sum, item) {
      return sum + item.price;
    }, 0);
  }, [expenseItems]);
  const balance = incomeTotal - expenseTotal;
  const chartData = useMemo(function () {
    return {
      labels: ['Income', 'Expenses'],
      datasets: [
        {
          data: [incomeTotal, expenseTotal],
          backgroundColor: ['#22c55e', '#ef4444'],
          borderColor: '#0f172a',
          borderWidth: 2,
        },
      ],
    };
  }, [incomeTotal, expenseTotal]);

  const chartOptions = useMemo(function () {
    return {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '70%',
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const value = context.parsed || 0;
              return `${context.label}: ${formatCurrency(value)}`;
            },
          },
        },
      },
    };
  }, []);

  function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  }

  function handleIncomeSubmit(event) {
    event.preventDefault();
    const price = Number.parseFloat(incomePrice);
    if (!incomeName.trim() || Number.isNaN(price)) {
      return;
    }
    setIncomeItems(function (prev) {
      return [{ id: crypto.randomUUID(), name: incomeName.trim(), price }].concat(prev);
    });
    setIncomeName('');
    setIncomePrice('');
  }

  function handleExpenseSubmit(event) {
    event.preventDefault();
    const price = Number.parseFloat(expensePrice);
    if (!expenseName.trim() || Number.isNaN(price)) {
      return;
    }
    setExpenseItems(function (prev) {
      return [{ id: crypto.randomUUID(), name: expenseName.trim(), price }].concat(prev);
    });
    setExpenseName('');
    setExpensePrice('');
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-5rem)] max-w-5xl flex-col justify-start space-y-4 overflow-x-auto overflow-y-auto px-4 py-4 font-mono text-slate-900 sm:space-y-6 sm:px-6 xl:justify-center">
      <div className="sticky top-0 z-10 flex justify-center py-2 backdrop-blur sm:static sm:bg-transparent sm:py-0">
        <Link
          className="inline-flex items-center justify-center border-2 border-slate-900 bg-blue-500 px-3 py-1.5 uppercase tracking-[0.18em] text-white transition hover:bg-blue-600 sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.2em]"
          to="/homepage"
        >
          Go Back
        </Link>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_auto_1fr]">
        <div className="flex items-center justify-center xl:order-2">
          <div className="relative h-44 w-44 rounded-full border-4 border-slate-900 bg-white shadow-[0_0_0_10px_rgba(15,23,42,0.1)] sm:h-52 sm:w-52">
            <Doughnut data={chartData} options={chartOptions} />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full border-4 border-slate-900 bg-white px-3 text-center sm:h-32 sm:w-32">
                <p className="uppercase tracking-[0.18em] text-slate-500 sm:text-xs sm:tracking-[0.2em]">
                  Balance
                </p>
                <p
                  className={`text-lg sm:text-xl ${balance >= 0 ? 'text-green-700' : 'text-red-600'}`}
                >
                  {formatCurrency(Math.abs(balance))}
                </p>
                <p className="uppercase tracking-[0.18em] text-slate-500 sm:text-xs sm:tracking-[0.2em]">
                  {balance >= 0 ? 'Surplus' : 'Deficit'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-3 rounded-xl border-4 border-green-600 bg-white p-4 text-sm xl:order-1">
          <p className="text-xs uppercase tracking-[0.25em] text-green-700">Income</p>
          <form className="grid gap-2" onSubmit={handleIncomeSubmit}>
            <label className="grid gap-1 text-xs uppercase tracking-[0.2em] text-slate-600">
              Item Name
              <input
                className="border-2 border-slate-900 px-3 py-2 text-sm"
                placeholder="Paycheck"
                value={incomeName}
                onChange={function (event) {
                  setIncomeName(event.target.value);
                }}
              />
            </label>
            <label className="grid gap-1 text-xs uppercase tracking-[0.2em] text-slate-600">
              Price
              <input
                className="border-2 border-slate-900 px-3 py-2 text-sm"
                placeholder="1500"
                value={incomePrice}
                onChange={function (event) {
                  setIncomePrice(event.target.value);
                }}
                inputMode="decimal"
              />
            </label>
            <button
              className="mt-1 inline-flex w-full items-center justify-center border-2 border-slate-900 bg-green-500 px-3 py-2 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-green-600"
              type="submit"
            >
              Add Income
            </button>
          </form>
          <div className="grid gap-2">
            <div className="flex items-center justify-between border-2 border-slate-900 bg-white px-3 py-2 text-xs uppercase tracking-[0.2em] text-slate-600">
              <span>Total</span>
              <span className="text-green-700">{formatCurrency(incomeTotal)}</span>
            </div>
            <div className="grid gap-2">
              {incomeItems.length === 0 ? (
                <p className="border-2 border-dashed border-slate-300 px-3 py-2 text-xs text-slate-500">
                  No income entries yet.
                </p>
              ) : (
                visibleIncomeItems.map(function (item) {
                  return (
                  <button
                    key={item.id}
                    className="flex items-center justify-between border-2 border-slate-900 bg-white px-3 py-2 text-sm transition hover:bg-emerald-50"
                    onClick={function () {
                      setIncomeItems(function (prev) {
                        return prev.filter(function (entry) {
                          return entry.id !== item.id;
                        });
                      });
                    }}
                    type="button"
                  >
                    <span>{item.name}</span>
                    <span className="text-green-700">{formatCurrency(item.price)}</span>
                  </button>
                  );
                })
              )}
              {extraIncomeCount > 0 ? (
                <p className="text-xs text-slate-500">+{extraIncomeCount} more</p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="grid gap-3 rounded-xl border-4 border-red-600 bg-white p-4 text-sm xl:order-3">
          <p className="text-xs uppercase tracking-[0.25em] text-red-700">Expenses</p>
          <form className="grid gap-2" onSubmit={handleExpenseSubmit}>
            <label className="grid gap-1 text-xs uppercase tracking-[0.2em] text-slate-600">
              Item Name
              <input
                className="border-2 border-slate-900 px-3 py-2 text-sm"
                placeholder="Rent"
                value={expenseName}
                onChange={function (event) {
                  setExpenseName(event.target.value);
                }}
              />
            </label>
            <label className="grid gap-1 text-xs uppercase tracking-[0.2em] text-slate-600">
              Price
              <input
                className="border-2 border-slate-900 px-3 py-2 text-sm"
                placeholder="800"
                value={expensePrice}
                onChange={function (event) {
                  setExpensePrice(event.target.value);
                }}
                inputMode="decimal"
              />
            </label>
            <button
              className="mt-1 inline-flex w-full items-center justify-center border-2 border-slate-900 bg-red-500 px-3 py-2 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-red-600"
              type="submit"
            >
              Add Expense
            </button>
          </form>
          <div className="grid gap-2">
            <div className="flex items-center justify-between border-2 border-slate-900 bg-white px-3 py-2 text-xs uppercase tracking-[0.2em] text-slate-600">
              <span>Total</span>
              <span className="text-red-700">{formatCurrency(expenseTotal)}</span>
            </div>
            <div className="grid gap-2">
              {expenseItems.length === 0 ? (
                <p className="border-2 border-dashed border-slate-300 px-3 py-2 text-xs text-slate-500">
                  No expense entries yet.
                </p>
              ) : (
                visibleExpenseItems.map(function (item) {
                  return (
                  <button
                    key={item.id}
                    className="flex items-center justify-between border-2 border-slate-900 bg-white px-3 py-2 text-sm transition hover:bg-red-50"
                    onClick={function () {
                      setExpenseItems(function (prev) {
                        return prev.filter(function (entry) {
                          return entry.id !== item.id;
                        });
                      });
                    }}
                    type="button"
                  >
                    <span>{item.name}</span>
                    <span className="text-red-700">{formatCurrency(item.price)}</span>
                  </button>
                  );
                })
              )}
              {extraExpenseCount > 0 ? (
                <p className="text-xs text-slate-500">+{extraExpenseCount} more</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-3 xl:grid-cols-2">
        <div className="grid gap-2 rounded-xl border-4 border-blue-600 bg-white p-3 text-xs">
          <p className="text-xs uppercase tracking-[0.25em] text-blue-700">Totals</p>
          <div className="flex items-center justify-between border-2 border-slate-900 bg-white px-3 py-2">
            <span>Income</span>
            <span className="text-green-700">{formatCurrency(incomeTotal)}</span>
          </div>
          <div className="flex items-center justify-between border-2 border-slate-900 bg-white px-3 py-2">
            <span>Expenses</span>
            <span className="text-red-700">{formatCurrency(expenseTotal)}</span>
          </div>
        </div>
        <div className="grid gap-2 rounded-xl border-4 border-slate-900 bg-white p-3 text-xs">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-700">Balance Status</p>
          <div className="flex items-center justify-between border-2 border-slate-900 bg-white px-3 py-2">
            <span>Net</span>
            <span className={balance >= 0 ? 'text-green-700' : 'text-red-600'}>
              {formatCurrency(balance)}
            </span>
          </div>
          <p className="text-xs text-slate-500">
            {balance >= 0
              ? 'Your income is ahead of your expenses.'
              : 'Your expenses are above your income.'}
          </p>
        </div>
      </div>
    </div>
  );
}
