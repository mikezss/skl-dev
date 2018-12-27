import { SklDevModule } from './skl-dev.module';

describe('SklDevModule', () => {
  let sklDevModule: SklDevModule;

  beforeEach(() => {
    sklDevModule = new SklDevModule();
  });

  it('should create an instance', () => {
    expect(sklDevModule).toBeTruthy();
  });
});
