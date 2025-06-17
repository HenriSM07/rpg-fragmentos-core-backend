import { ConsoleLogger, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService extends ConsoleLogger {
  private readonly nestLogo = `
  ███╗   ██╗███████╗███████╗████████╗
  ████╗  ██║██╔════╝██╔════╝╚══██╔══╝
  ██╔██╗ ██║█████╗  ███████╗   ██║   
  ██║╚██╗██║██╔══╝  ╚════██║   ██║   
  ██║ ╚████║███████╗███████║   ██║   
  ╚═╝  ╚═══╝╚══════╝╚══════╝   ╚═╝   
  `;

  logApplicationStart(port: number | string) {
    console.log(this.nestLogo);
    this.log(`🚀 Aplicação iniciada na porta: ${port}`);
    this.log(`📚 Swagger UI: http://localhost:${port}/api/docs`);
    this.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
    this.log(`🕒 Iniciado em: ${new Date().toISOString()}`);
  }

  logDatabaseStatus(status: string) {
    this.log(`🗄️ Status do banco de dados: ${status}`);
  }

  logError(error: Error) {
    this.error(`❌ Erro: ${error.message}`, error.stack);
  }
}