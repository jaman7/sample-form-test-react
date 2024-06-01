import { FormikProps } from 'formik';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Input from '../input/Input';
import { IInput } from '../input/input.model';
import Select from '../select/Select';
import { ISelect } from '../select/Select.model';
import { FormCellConfigDefault, IFormElements } from './FormElements.model';
import Validator from '../Validator';
import { ITextarea } from 'common/inputTextarea/Textarea.model';
import Textarea from 'common/inputTextarea/Textarea';

interface IProps {
  formControlName?: string;
  config?: IFormElements;
  formik?: FormikProps<any>;
  valueChange?: Dispatch<SetStateAction<any>>;
  [key: string]: any;
}

const FormCell: React.FC<IProps> = ({ formControlName, config, formik, valueChange }) => {
  const { t } = useTranslation();
  const formCellConfig = useMemo(() => ({ ...FormCellConfigDefault(), ...config }), [config, formControlName]);

  const itemsConfig = (data: IInput): Partial<IInput> => {
    const dataTmp: Partial<IInput> = { ...data };

    switch (data.formCellType) {
      case 'input':
        dataTmp.type = 'text';
        break;
      case 'input-number':
        dataTmp.type = 'number';
        break;
      default:
        break;
    }
    return dataTmp;
  };

  const headerElement = useMemo(
    () => (formCellConfig.isHeader ? <span className="label">{t(formCellConfig.header ?? '')}</span> : null),
    [formCellConfig.isHeader, formCellConfig.header, t]
  );

  const renderFormType = (): JSX.Element => {
    switch (formCellConfig.formCellType) {
      case 'input':
      case 'input-number':
        return (
          <Input
            formik={formik}
            valueChange={valueChange}
            formControlName={formControlName}
            config={itemsConfig(formCellConfig as IInput)}
          />
        );
      case 'select':
        return <Select formik={formik} valueChange={valueChange} formControlName={formControlName} config={formCellConfig as ISelect} />;
      case 'text-area':
        return (
          <Textarea formik={formik} valueChange={valueChange} formControlName={formControlName} config={formCellConfig as ITextarea} />
        );
      default:
        return <></>;
    }
  };

  return (
    <div className={`form-cell-component ${formCellConfig.formCellClass ?? ''}`}>
      {headerElement}
      {renderFormType()}
      <Validator formName={formControlName} formik={formik} />
    </div>
  );
};

export default FormCell;
