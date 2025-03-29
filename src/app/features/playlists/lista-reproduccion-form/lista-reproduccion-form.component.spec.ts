import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaReproduccionFormComponent } from './lista-reproduccion-form.component';

describe('ListaReproduccionFormComponent', () => {
  let component: ListaReproduccionFormComponent;
  let fixture: ComponentFixture<ListaReproduccionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaReproduccionFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaReproduccionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
