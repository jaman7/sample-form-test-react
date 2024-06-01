import { FormikProps } from 'formik';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ifChanged, usePrevious } from 'shared/utils/helpers';
import { ITextarea, configDefault } from './Textarea.model';
import { InputTextarea } from 'primereact/inputtextarea';
import { classNames } from 'primereact/utils';

interface IProps {
  config?: ITextarea;
  formik?: FormikProps<any>;
  [key: string]: any;
}

const Textarea: React.FC<IProps> = ({ config, formControlName, formik }) => {
  const { t } = useTranslation();
  const value = formik?.values?.[formControlName] ?? '';
  const prevConfig = usePrevious(config);
  const [textAreaConfig, setTextAreaConfig] = useState<ITextarea>(configDefault());

  useEffect(() => {
    ifChanged(prevConfig, config, () => {
      setTextAreaConfig({ ...configDefault(), ...config });
    });
  }, [config]);

  const { placeholder, disabled, minRows } = textAreaConfig;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    formik?.setFieldValue(formControlName, e.target.value);
  };

  const isFormFieldInvalid = formik?.touched?.[formControlName] && formik?.errors?.[formControlName];
  return (
    <InputTextarea
      className={classNames('textarea-component', { invalid: isFormFieldInvalid })}
      id={formControlName}
      autoResize
      value={value}
      onChange={handleChange}
      rows={minRows}
      placeholder={t(placeholder || '')}
      disabled={disabled}
    />
  );
};

export default Textarea;
