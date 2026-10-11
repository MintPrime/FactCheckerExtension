import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Klippy } from './klippy';

describe('Klippy', () => {
  let component: Klippy;
  let fixture: ComponentFixture<Klippy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Klippy],
    }).compileComponents();

    fixture = TestBed.createComponent(Klippy);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
