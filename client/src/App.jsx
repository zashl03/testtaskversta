import { Routes, Route, Link } from 'react-router-dom';
import OrdersList from './pages/OrdersList';
import CreateOrder from './pages/CreateOrder';
import OrderDetails from './pages/OrderDetails';

function App() {
  return (
    <div>
      <nav className="px-4 py-3 border-b border-slate-200 bg-white">
        <Link to="/" className="text-blue-600 hover:text-blue-700 mr-4 text-sm font-medium">Список заказов</Link>
        <Link to="/create" className="text-blue-600 hover:text-blue-700 text-sm font-medium">Создать заказ</Link>
      </nav>

      <Routes>
        <Route path="/" element={<OrdersList />} />
        <Route path="/create" element={<CreateOrder />} />
        <Route path="/order/:id" element={<OrderDetails />} />
      </Routes>
    </div>
  );
}

export default App;