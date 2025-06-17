import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getSystemInfo() {
    return {
      status: 'online',
      environment: process.env.NODE_ENV || 'development',
      memoryUsage: process.memoryUsage(),
      uptime: process.uptime(),
      nodeVersion: process.version,
    };
  }

  getHello(): string {
    return 'Hello World!';
  }
}