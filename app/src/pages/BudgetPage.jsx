import { Link } from 'react-router-dom';

export default function BudgetPage() {
  return (
    <div>
      <Link to="/homepage">Back</Link>
      <p>Budget Overview</p>
      <h1>Budget Page</h1>
      <p>Add your budget widgets and charts here.</p>
    </div>
  );
}
