import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/modules/app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

function docs(app) {
  const options = new DocumentBuilder().setTitle('书签').setDescription('书签网站').setVersion('1.0').addTag('书签').build()
  const document = SwaggerModule.createDocument(app, options)
  for (const path of Object.keys(document.paths)) {
		const pathItem = document.paths[path]
		if (!pathItem) {
			continue
		}
		for (const method of Object.keys(pathItem)) {
			const responses = document.paths[path][method].responses
			if (!responses) {
				continue
			}
			for (const status of Object.keys(responses)) {
				const json = responses[status].content?.['application/json']
				if (!json) {
					responses[status].content = {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/Response',
							},
						},
					}
					continue
				}
				const schema = json.schema
				json.schema = {
					allOf: [
						{
							$ref: '#/components/schemas/Response',
						},
						{
							type: 'object',
							properties: {
								data: schema,
							},
							required: ['data'],
						},
					],
				}
			}
		}
	}

	document.components.schemas.Response = {
		type: 'object',
		properties: {
			code: {
				type: 'integer',
				description: '状态码',
				example: 200,
				format: 'int32',
			},
			message: {
				type: 'string',
				description: '提示信息',
				example: '请求成功',
			},
		},
		required: ['code', 'message'],
	}
  SwaggerModule.setup('docs', app, document)
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			transformOptions: { enableImplicitConversion: true },
		}),
	)
  // app.useGlobalPipes(new CustomValidationPipe())
  docs(app)
  await app.listen(3000);
}
bootstrap();
