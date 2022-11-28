import {Pai} from "./pai"
import {Mae} from "./mae"
import {Dependente} from "./dependente"

export interface Familia{
  familiaId: string;
  pai: Pai;
  mae: Mae;
  dependentes: Dependente[];
}
