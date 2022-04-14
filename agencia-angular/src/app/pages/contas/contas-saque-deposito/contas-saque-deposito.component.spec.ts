import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContasSaqueDepositoComponent } from './contas-saque-deposito.component';

describe('ContasSaqueDepositoComponent', () => {
  let component: ContasSaqueDepositoComponent;
  let fixture: ComponentFixture<ContasSaqueDepositoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContasSaqueDepositoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContasSaqueDepositoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
