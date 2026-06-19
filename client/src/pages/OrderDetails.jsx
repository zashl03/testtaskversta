import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrderById } from '../api/orders';

function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const data = await getOrderById(id);
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadOrder();
  }, [id]);

  if (loading) return <div className="max-w-4xl mx-auto p-5 text-center text-slate-500">Загрузка...</div>;
  if (error) return <div className="max-w-4xl mx-auto p-5 text-center text-red-600">Ошибка: {error}</div>;
  if (!order) return <div className="max-w-4xl mx-auto p-5 text-center text-slate-500">Заказ не найден</div>;

  const fields = [
    { label: 'ID', value: order.id },
    { label: 'Город отправителя', value: order.senderCity },
    { label: 'Адрес отправителя', value: order.senderAddress },
    { label: 'Город получателя', value: order.recipientCity },
    { label: 'Адрес получателя', value: order.recipientAddress },
    { label: 'Вес груза', value: `${order.cargoWeight} кг` },
    { label: 'Дата забора', value: new Date(order.cargoDatePickup).toLocaleDateString('ru-RU') },
  ];

  return (
    <div className="max-w-4xl mx-auto p-5 bg-white rounded-2xl shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-800 mb-6">Детали заказа</h2>

      <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 grid grid-cols-2 gap-x-5 gap-y-3">
        {fields.map((field, i) => (
          <div key={i} className="text-slate-700">
            <div className="font-semibold text-slate-900 text-sm">{field.label}</div>
            <div>{field.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Link to="/" className="text-blue-600 hover:text-blue-700">← Назад к списку</Link>
      </div>
    </div>
  );
}

export default OrderDetails;