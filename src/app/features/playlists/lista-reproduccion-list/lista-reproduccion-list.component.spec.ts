import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaReproduccionListComponent } from './lista-reproduccion-list.component';

describe('ListaReproduccionListComponent', () => {
  let component: ListaReproduccionListComponent;
  let fixture: ComponentFixture<ListaReproduccionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaReproduccionListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaReproduccionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
