import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderServiceComponent } from './header-service.component';

describe('HeaderServiceComponent', () => {
  let component: HeaderServiceComponent;
  let fixture: ComponentFixture<HeaderServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
