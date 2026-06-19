# Versta API

Система управления заказами доставки с фронтенд приложением и REST API.
## Стек технологий

### Frontend
- **React 19** - UI библиотека
- **Vite** - сборщик проекта
- **React Router** - маршрутизация
- **Tailwind CSS** - стилизация
- **ESLint** - линтер

### Backend
- **.NET 9** - фреймворк
- **ASP.NET Core** - веб-фреймворк
- **Entity Framework Core 9** - ORM
- **PostgreSQL 17** - база данных
- **Swagger** - документация API

---

## Запуск через Docker

### Требования
- Docker
- Docker Compose

### Команда
```bash
docker-compose up
```

### Доступ
- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:5000
- **Swagger docs**: http://localhost:5000/swagger
- **PostgreSQL**: localhost:5432

---

## Локальная разработка

### Требования
- Node.js 18+
- .NET 9 SDK
- PostgreSQL 17

### Frontend

```bash
cd client
npm install
npm run dev
```

Frontend запустится на http://localhost:5173

### Backend

1. **Настроить подключение БД в `server/src/appsettings.Development.json`:**
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=versta_api;Username=postgres;Password=YOUR_PASSWORD"
  }
}
```

2. **Запустить приложение:**
```bash
cd server/src
dotnet run
```

Backend запустится на http://localhost:5254

3. **Swagger документация:** http://localhost:5254/swagger

---

## Структура проекта

```
versta/
├── client/              
│   ├── src/
│   │   ├── pages/       
│   │   ├── components/  
│   │   └── api/         
│   ├── vite.config.js   
│   └── package.json
│
├── server/              
│   └── src/
│       ├── Controllers/ 
│       ├── Services/    
│       ├── Models/      
│       ├── Data/        
│       ├── DTOs/        
│       ├── Program.cs   
│       └── appsettings.json
│
├── compose.yaml         
└── .gitignore
```

---

## API Endpoints

### GET /api/orders
Получить все заказы

### GET /api/orders/{id}
Получить заказ по ID

### POST /api/orders
Создать новый заказ

```json
{
  "senderCity": "Москва",
  "senderAddress": "ул. Тверская, 1",
  "recipientCity": "СПб",
  "recipientAddress": "пр. Невский, 50",
  "cargoWeight": 5.5,
  "cargoDatePickup": "2026-06-20"
}
```

