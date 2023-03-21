import { Module } from '@nestjs/common';
import { LiverymanController } from './liveryman.controller';
import { LiverymanService } from './liveryman.service';

@Module({
  controllers: [LiverymanController],
  providers: [LiverymanService],
})
export class LiverymanModule {}
