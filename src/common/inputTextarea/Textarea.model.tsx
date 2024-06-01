export type TextareaType = 'text-area';

export interface ITextarea {
  formControlName?: string;
  placeholder?: string;
  readonly?: boolean;
  field?: string;
  type?: TextareaType;
  defaultValue?: string;
  disabled?: boolean;
  minRows?: number;
  maxRows?: number;
  [key: string]: any;
}

export const configDefault = (): ITextarea => ({
  minRows: 3,
  placeholder: '',
});
