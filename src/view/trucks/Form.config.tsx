import { IFormElementsConfig } from 'common/formElements/FormElements.model';
import { IDictType } from 'common/select/Select.model';
import * as Yup from 'yup';

export const formConfigTrucks: IFormElementsConfig = {
  code: {},
  name: {},
  statusId: { config: { formCellType: 'select', dictName: 'selectDict' } },
  description: { config: { formCellType: 'text-area' } },
};

export const validationSchema = Yup.object().shape({
  code: Yup.string().required().min(1),
  name: Yup.string().required().min(1),
  statusId: Yup.string().required().min(1),
});

export const selectDict: IDictType[] = [
  { id: 1, displayName: 'LOADING' },
  { id: 2, displayName: 'TO_JOB' },
  { id: 3, displayName: 'AT_JOB' },
  { id: 4, displayName: 'RETURNING' },
  { id: 5, displayName: 'OUT_OF_SERVICE' },
];

export const dictionaries: { [name: string]: IDictType[] } = {
  selectDict,
};
