import { Link } from 'react-router-dom';

function OrderCard({ order }) {
  return (
    <li className="p-3 bg-white rounded border border-slate-200">
      <Link to={`/order/${order.id}`} className="flex justify-between items-center">
        <div>
          <span className="font-medium text-blue-600">#{order.id.slice(0, 8)}</span>
          <span className="ml-2 text-slate-600 text-sm">
            {order.senderCity} → {order.recipientCity}
          </span>
        </div>
        <span className="text-slate-400 text-xs">
          {new Date(order.cargoDatePickup).toLocaleDateString('ru-RU')}
        </span>
      </Link>
    </li>
  );
}

export default OrderCard;