import { Component, OnInit } from '@angular/core';
import { FilmesService } from 'src/app/core/filmes.service';
import { Filme } from 'src/app/shared/models/filme';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ConfigParams } from 'src/app/shared/models/config-params';
import {debounceTime} from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {
  readonly semFoto = 'http://www.termoparts.com.br/wp-content/uploads/2017/10/no-image.jpg';
  filmes: Filme[] = new Array();
  config: ConfigParams = {
    pagina : 0,
    limite: 4 

  }
  filtrosListagem : FormGroup;
  generos: Array<string>;

  constructor(private filmeService: FilmesService, private fb: FormBuilder, private router: Router) { }
  private listarFilmes(): void {
    this.config.pagina ++;
    this.filmeService.listar(this.config).subscribe((filmes) =>{
      this.filmes.push(...filmes);
    });
  }
  private resetarConsulta() : void{
    this.config.pagina =0;
    this.filmes = [];
    this.listarFilmes();
  }
  ngOnInit() :void {
    this.filtrosListagem = this.fb.group({
      texto: [''],
      genero: ['']
    })
    this.generos = ['Ação', 'Romance', 'Aventura', 'Terror', 'Ficção cientifíca', 'Comédia','Aventura','Drama'];
    this.listarFilmes();

    this.filtrosListagem.get('texto').valueChanges.pipe(debounceTime(400)).subscribe((val: string) =>{
      this.config.pesquisa = val;
      this.resetarConsulta();
    });

    this.filtrosListagem.get('genero').valueChanges.subscribe((val: string) =>{
      this.config.campo = {tipo: 'genero', valor: val};
      this.resetarConsulta();
    });
  }
  onScroll() : void{
   this.listarFilmes();
  }
  abrir (id : number) : void {
    this.router.navigateByUrl('/filmes/' + id);
  }


}
