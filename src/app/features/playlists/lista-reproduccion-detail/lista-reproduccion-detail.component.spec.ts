import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaReproduccionDetailComponent } from './lista-reproduccion-detail.component';

describe('ListaReproduccionDetailComponent', () => {
  let component: ListaReproduccionDetailComponent;
  let fixture: ComponentFixture<ListaReproduccionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaReproduccionDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaReproduccionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
