import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConversorService, MoedaService } from '../services';
import { Moeda, Conversao, ConversaoResponse } from '../models';

@Component({
  selector: 'app-conversor',
  templateUrl: './conversor.component.html',
  styleUrls: ['./conversor.component.css']
})
export class ConversorComponent implements OnInit {

  public moedas: Moeda[];
  public conversao: Conversao
  public possuiErro: boolean;
  public conversaoResponse: ConversaoResponse;

  @ViewChild("conversaoForm", {static:true})conversaoForm: NgForm;

  constructor(private moedaService: MoedaService, private conversorService: ConversorService) { }

  ngOnInit(): void {
    this.moedas = this.moedaService.listarTodas();
    this.init();
  }

  /**
   * Efetua a chamada a conversao dos valores.
   */
  init(): void {
    this.conversao = new Conversao('USD','BRL', null);
    this.possuiErro = false;
  }

  converter():void{
    if(this.conversaoForm.form.valid){
      this.conversorService.converter(this.conversao).subscribe(
        response => this.conversaoResponse = response,
        error => this.possuiErro = true
      )
    }
  }

}
