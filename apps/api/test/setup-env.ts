process.env.NODE_ENV = "test";
process.env.DATABASE_URL ??=
  "postgresql://portfolio:portfolio@localhost:5432/portfolio";
process.env.PORT ??= "3001";
process.env.WEB_ORIGIN ??= "http://localhost:3000";
process.env.ADMIN_API_KEY ??= "test-api-key-value";
