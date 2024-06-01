import { ITextarea, TextareaType } from 'common/inputTextarea/Textarea.model';
import { IInput } from '../input/input.model';
import { InputTypes } from '../input/input.types';
import { IDictType, ISelect, SelectType } from '../select/Select.model';

export type IFormElementsTypes = 'text' | 'input' | 'input-number' | 'select' | 'text-area';

export interface IFormElementsConfig {
  [name: string]: IFormElements;
}

export type IFormElements = Omit<ISelect & IInput & ITextarea, 'type'> & {
  config?: IFormElements;
  header?: string;
  isHeader?: boolean;
  disabled?: boolean;
  formCellType?: IFormElementsTypes;
  value?: string | number | any | any[];
  type?: SelectType | IFormElementsTypes | InputTypes | TextareaType;
  hidden?: boolean;
  styleClass?: string;
  prefix?: string;
  placeholder?: string;
  isNoPlaceholder?: boolean;
  dictName?: string;
  name?: string;
  max?: number;
  min?: number;
  step?: number;
  dictData?: IDictType[];
  [key: string]: any;
};

export const FormCellConfigDefault = (): IFormElements => ({
  step: 1,
  type: 'text',
});
