import { INestApplication, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";

export function configureApp(app: INestApplication): void {
  app.setGlobalPrefix("api");
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = app.get(ConfigService);
  app.enableCors({
    origin: config.getOrThrow<string>("WEB_ORIGIN"),
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "x-api-key"],
  });

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle("Portfolio API")
      .setDescription(
        "Professional profile, experience, skills, projects, and contact channels for Alejandro Morel.",
      )
      .setVersion("1.0")
      .addApiKey({ type: "apiKey", name: "x-api-key", in: "header" }, "api-key")
      .build(),
  );
  SwaggerModule.setup("docs", app, document);
}
