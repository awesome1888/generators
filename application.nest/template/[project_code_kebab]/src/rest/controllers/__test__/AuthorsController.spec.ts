import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsController } from '../AuthorsController';

describe('AuthorsController', () => {
    let controller: AuthorsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthorsController],
        }).compile();

        controller = module.get<AuthorsController>(AuthorsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
