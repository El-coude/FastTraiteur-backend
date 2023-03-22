import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryManController } from './deliveryman.controller';

describe('LiverymanController', () => {
  let controller: DeliveryManController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryManController],
    }).compile();

    controller = module.get<DeliveryManController>(DeliveryManController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
