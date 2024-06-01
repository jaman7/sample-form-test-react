import { FormikProps } from 'formik';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ISelect, selectConfigDefault } from './Select.model';
import { ifChanged, usePrevious } from 'shared/utils/helpers';
import { classNames } from 'primereact/utils';

interface IProps {
  config?: Partial<ISelect>;
  formik?: FormikProps<any>;
  [key: string]: any;
}

const Select: React.FC<IProps> = ({ config, formControlName, formik }) => {
  const { t } = useTranslation();
  const value = formik?.values?.[formControlName] ?? null;
  const prevConfig = usePrevious(config);
  const [selectConfig, setSelectConfig] = useState<ISelect>(selectConfigDefault());

  useEffect(() => {
    ifChanged(prevConfig, config, () => {
      setSelectConfig({ ...selectConfigDefault(), ...config });
    });
  }, [config]);

  const { dictData, placeholder, disabled } = selectConfig;

  const handleChange = (e: DropdownChangeEvent) => {
    formik?.setFieldValue(formControlName, e.value);
    e.preventDefault();
  };

  const isFormFieldInvalid = !!(formik?.touched?.[formControlName] && formik?.errors?.[formControlName]);

  return (
    <>
      <Dropdown
        className={classNames('select-component', { invalid: isFormFieldInvalid })}
        id={formControlName}
        name={formControlName}
        value={value}
        onChange={handleChange}
        options={dictData}
        valueTemplate={option => option?.displayName}
        itemTemplate={option => option?.displayName}
        optionLabel="displayName"
        optionValue="id"
        placeholder={placeholder ? t(placeholder) : ''}
        panelClassName="select-component-panel"
        disabled={disabled}
      />
      <span>{placeholder ? t(placeholder) : ''}</span>
    </>
  );
};

export default Select;
