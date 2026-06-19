import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOrders } from '../api/orders';
import OrderCard from '../components/OrderCard';

function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getOrders()
      .then(setOrders)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center text-slate-500 mt-10">Загрузка...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">Ошибка: {error}</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Заказы</h2>
        <Link to="/create" className="text-blue-600 text-sm">+ Создать</Link>
      </div>

      {orders.length === 0 ? (
        <p className="text-slate-500">Заказов пока нет</p>
      ) : (
        <ul className="space-y-2">
          {orders.map(order => <OrderCard key={order.id} order={order} />)}
        </ul>
      )}
    </div>
  );
}

export default OrdersList;