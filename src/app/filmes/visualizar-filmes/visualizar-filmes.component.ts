import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmesService } from 'src/app/core/filmes.service';
import { Filme } from 'src/app/shared/models/filme';
import { MatDialog } from '@angular/material/dialog';
import { Alerta } from 'src/app/shared/models/alerta';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';

@Component({
  selector: 'dio-visualizar-filmes',
  templateUrl: './visualizar-filmes.component.html',
  styleUrls: ['./visualizar-filmes.component.scss']
})
export class VisualizarFilmesComponent implements OnInit {

  filme: Filme;
  readonly semFoto = 'http://www.termoparts.com.br/wp-content/uploads/2017/10/no-image.jpg';
  constructor(public dialog: MatDialog,
    private router : Router,  private activatedRoute: ActivatedRoute, private filmesService: FilmesService) { }
  id: number;
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.visualizar();
  }
  editar() :void {
    this.router.navigateByUrl('/filmes/cadastro/' + this.id);
  }
  excluir() : void {
    const config = {
      data :{
        titulo: 'Você tem certeza de que deseja excluir?',
        descricao: 'Caso você tenha certeza que deseja excluir , clique no botão OK',
        possuirBtnFechar: true,
        corBtnCancelar: 'warn',
        corBtnSucesso: 'primary'
      } as Alerta
    };
    const dialogRef = this.dialog.open(AlertaComponent, config);
    dialogRef.afterClosed().subscribe((opcao: boolean) =>{
      if(opcao){
        this.filmesService.excluir(this.id).subscribe(() => this.router.navigateByUrl('/filmes'));
      }
    })
  }
  private visualizar(): void {
    this.filmesService.visualizar(this.id).subscribe((filme: Filme) => {
      this.filme = filme;
    });
  }

}
