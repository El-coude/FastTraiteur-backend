import { Module } from '@nestjs/common';
import { LiverymanController } from './deliveryman.controller';
import { LiverymanService } from './deliveryman.service';

@Module({
  controllers: [LiverymanController],
  providers: [LiverymanService],
})
export class LiverymanModule {}
