import { Test, TestingModule } from '@nestjs/testing';
import { LiverymanService } from './deliveryman.service';

describe('LiverymanService', () => {
  let service: LiverymanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LiverymanService],
    }).compile();

    service = module.get<LiverymanService>(LiverymanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
