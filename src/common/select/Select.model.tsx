export type SelectType = 'Select';

export interface IDictType {
  displayName?: string;
  id?: number | string;
  [key: string]: any;
}

export interface ISelect {
  formControlName?: string;
  placeholder?: string;
  readonly?: boolean;
  field?: string;
  type?: SelectType;
  defaultValue?: number;
  dictData?: IDictType[];
  disabled?: boolean;
  [key: string]: any;
}

export const selectConfigDefault = (): ISelect => ({
  placeholder: '',
  dictData: [],
});
