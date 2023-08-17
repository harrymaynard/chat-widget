# Chat Widget

## Setup
Create and run Docker container for Redis server:
```bash
docker run --name chat-widget-redis -d -p 6379:6379 redis:7
```

Create and run Docker container for MySQL server:
```bash
docker run --name chat-widget-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password -d mysql:8
```

Install project dependencies:
```bash
npm run setup
```

## Running Locally
Run back-end:
```bash
cd backend/
npm run dev
```

Run front-end widget:
```bash
cd widget/
npm run dev
```

Run front-end admin portal:
```bash
cd portal/
npm run dev
```