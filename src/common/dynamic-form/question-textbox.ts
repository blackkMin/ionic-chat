import {DataBase} from "../../providers/data-base";


export class TextboxQuestion extends DataBase<string> {
  controlType = 'textbox';
  type: string;
  abs: true;


  constructor(options: {} = {}) {
    super(options);
    console.log(options,'~~~');
    this.type = options['type'] || '';
    this.abs = options['abs'] || '';
  }
}
