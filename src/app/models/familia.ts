import {Dependente} from "./dependente"

export interface Familia{
  familiaId: string;
  endereco: string;
  paiNome: string;
  paiNascimento: string;
  paiTurma: string;
  paiOcupacao: string;
  paiContato: string;
  maeNome: string;
  maeNascimento: string;
  maeTurma: string;
  maeOcupacao: string;
  maeContato: string;

  dependentes: Dependente[];
}
