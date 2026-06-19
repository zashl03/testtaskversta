import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createOrder } from '../api/orders';

function CreateOrder() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    senderCity: '', senderAddress: '',
    recipientCity: '', recipientAddress: '',
    cargoWeight: '', cargoDatePickup: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const requiredFields = ['senderCity', 'senderAddress', 'recipientCity', 'recipientAddress', 'cargoWeight', 'cargoDatePickup'];
    const emptyFields = requiredFields.filter(field => !form[field] || form[field].toString().trim() === '');
    
    if (emptyFields.length > 0) {
      return `Пожалуйста, заполните все поля`;
    }
    
    if (parseFloat(form.cargoWeight) <= 0) {
      return 'Вес должен быть больше нуля';
    }
    
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      await createOrder({ ...form, cargoWeight: parseFloat(form.cargoWeight) });
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <Link to="/" className="text-blue-600 text-sm">← Назад</Link>
      <h2 className="text-xl font-semibold mt-4 mb-4">Новый заказ</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="senderCity" placeholder="Город отправителя" value={form.senderCity} onChange={handleChange} required
          className="w-full px-3 py-2 border border-slate-300 rounded text-sm" />
        <input name="senderAddress" placeholder="Адрес отправителя" value={form.senderAddress} onChange={handleChange} required
          className="w-full px-3 py-2 border border-slate-300 rounded text-sm" />
        <input name="recipientCity" placeholder="Город получателя" value={form.recipientCity} onChange={handleChange} required
          className="w-full px-3 py-2 border border-slate-300 rounded text-sm" />
        <input name="recipientAddress" placeholder="Адрес получателя" value={form.recipientAddress} onChange={handleChange} required
          className="w-full px-3 py-2 border border-slate-300 rounded text-sm" />
        <input name="cargoWeight" type="number" step="0.001" placeholder="Вес (кг)" value={form.cargoWeight} onChange={handleChange} required
          className="w-full px-3 py-2 border border-slate-300 rounded text-sm" />
        <input name="cargoDatePickup" type="date" value={form.cargoDatePickup} onChange={handleChange} required
          className="w-full px-3 py-2 border border-slate-300 rounded text-sm" />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button type="submit" disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded text-sm font-medium hover:bg-blue-700 disabled:bg-slate-400">
          {loading ? 'Создание...' : 'Создать'}
        </button>
      </form>
    </div>
  );
}

export default CreateOrder;