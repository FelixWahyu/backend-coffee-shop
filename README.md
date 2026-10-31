# Setup Project

Create .env file

```
DATABASE_URL="mysql://username:password@localhost:3306/database_name"
DATABASE_USER="username database"
DATABASE_PASSWORD="password database"
DATABASE_NAME="database name"
DATABASE_HOST="localhost"
DATABASE_PORT=3306
```

```shell
npm install

npx prisma migrate dev

npx prisma generate

npm run build

npm run start
```
