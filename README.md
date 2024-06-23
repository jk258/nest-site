## 目录
```
src
├──common 公共文件
├──config 配置
├──modules 模块
├──main.ts 入口
```
## 配置前缀
在`main.ts`中配置如下
```TypeScript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');//全局给接口配置api前缀
  await app.listen(3000);
}
```
## 静态服务
安装包`@nestjs/serve-static`
```bash
npm install --save @nestjs/serve-static
```
将`ServeStaticModule` 导入根 `AppModule`，并通过将配置对象传递给 forRoot() 方法来配置它
```TypeScript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```
