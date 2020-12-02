import { async, TestBed } from '@angular/core/testing';
import { NgxCzInModule } from './ngx-cz-in.module';

describe('NgxCzInModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxCzInModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgxCzInModule).toBeDefined();
  });
});
