import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarFilmesComponent } from './visualizar-filmes.component';

describe('VisualizarFilmesComponent', () => {
  let component: VisualizarFilmesComponent;
  let fixture: ComponentFixture<VisualizarFilmesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarFilmesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarFilmesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
