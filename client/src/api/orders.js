const API_BASE_URL = `${import.meta.env.VITE_API_URL || ''}/api/orders`;

export const getOrders = async () => {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    throw new Error('Не удалось загрузить заказы');
  }
  return response.json();
};

export const getOrderById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Заказ не найден');
  }
  return response.json();
};

export const createOrder = async (orderData) => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    let message = 'Не удалось создать заказ';
    try {
      const data = await response.json();
      if (data?.errors) {
        message = Object.values(data.errors).flat().join('; ');
      } else if (data?.error) {
        message = data.error;
      } else if (data?.title) {
        message = data.title;
      }
    } catch {  }
    throw new Error(message);
  }
  return response.json();
};