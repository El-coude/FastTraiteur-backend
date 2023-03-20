import { Test, TestingModule } from '@nestjs/testing';
import { LiverymanController } from './liveryman.controller';

describe('LiverymanController', () => {
  let controller: LiverymanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LiverymanController],
    }).compile();

    controller = module.get<LiverymanController>(LiverymanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
