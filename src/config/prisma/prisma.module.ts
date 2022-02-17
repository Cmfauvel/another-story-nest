import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // 👈 makes PrismaService globally available
@Module({
  imports: [PrismaService],
  providers: [PrismaService],
  exports: [PrismaService], // 👈 export PrismaService for DI
})
export class PrismaModule {}
