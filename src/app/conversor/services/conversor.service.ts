import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConversaoResponse, Conversao } from '../models';
import { Observable } from 'rxjs';

@Injectable()
export class ConversorService {

  private readonly BASE_URL = "http://data.fixer.io/api/latest?access_key=eba7130a5b2d720ce43eb5fcddd47cc3";

  constructor(private http: HttpClient) { }

  /**
   * 
   * Realizar a chamada para a API de conversão de moedas.
   * @returns this.http.get(this.BASE_URL + params);
   */
  converter(conversao: Conversao): Observable<any>{
    let params = `&base=${conversao.moedaDe}&symbols=${conversao.moedaPara}`;
    return this.http.get(this.BASE_URL + params);
  }

  /**
   * Retorna a cotacao para um dado de resposta (response)
   * @param conversaoRespose
   * @param conversao
   * @returns :number
   */
  cotacaoPara(conversaoRespose: ConversaoResponse, conversao: Conversao): number{
    if(conversaoRespose === undefined){
      return 0;
    }
    return conversaoRespose.rates[conversao.moedaPara];

  }

  cotacaoDe(conversaoRespose: ConversaoResponse, conversao: Conversao): string{
    if(conversaoRespose === undefined){
      return '0';
    }
    return (1/conversaoRespose.rates[conversao.moedaPara]).toFixed(4);
  }

  dataCotacao(conversaoResponse: ConversaoResponse):string{
    if(conversaoResponse === undefined){
      return '';
    }
    return conversaoResponse.date;
  }

}
