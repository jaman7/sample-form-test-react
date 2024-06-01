import { FormikProps } from 'formik';
import { classNames } from 'primereact/utils';
import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { IInput, inputConfigDefault } from './input.model';
import { InputType } from './input.types';
import Button from '../Button';
import { ifChanged, isNumeric, mathSubtraction, usePrevious } from 'shared/utils/helpers';

const { NUMBER } = InputType;

interface IProps {
  config?: Partial<IInput>;
  formik?: FormikProps<any>;
  [name: string]: any;
}

const Input: React.FC<IProps> = ({ config, formControlName, formik }) => {
  const { t } = useTranslation();
  const value = formik?.values?.[formControlName] ?? '';
  const prevConfig = usePrevious({ config });
  const [inputConfig, setInputConfig] = useState<IInput>(inputConfigDefault());

  const { type, placeholder, readonly, inputClass, maxLength, min = 0, max = 1000, step = 1, disableBtnNumbers, disabled } = inputConfig;

  useEffect(() => {
    ifChanged(prevConfig?.config, config, () => {
      setInputConfig({ ...inputConfigDefault(), ...config });
    });
  }, [config]);

  const isTypeNumber = type === NUMBER && !disableBtnNumbers;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    formik?.setFieldValue?.(formControlName, isTypeNumber ? +e.target.value : e.target.value);
    e.preventDefault();
  };

  const handleStepChange = (e: React.MouseEvent<HTMLButtonElement>, isIncrement: boolean) => {
    e.preventDefault();
    if (typeof value !== 'number' && isNumeric(value)) {
      formik?.setFieldValue?.(formControlName, Number(value) ?? 0);
    }
    formik?.setFieldValue?.(formControlName, +mathSubtraction((value as number) ?? 0, step, isIncrement));
    if (typeof value === 'number') {
      if (value > max) formik?.setFieldValue?.(formControlName, max);
      else if (value < min) formik?.setFieldValue?.(formControlName, min);
    }
  };

  const isFormFieldInvalid = (name: string): boolean => !!(formik?.dirty && formik?.errors?.[name]);

  return (
    <div className="input-component">
      <div className={`input-component--content ${classNames({ invalid: isFormFieldInvalid(formControlName) })}`}>
        {isTypeNumber && (
          <Button handleClick={e => handleStepChange(e, false)}>
            <FaMinus />
          </Button>
        )}
        <input
          id={formControlName ?? ''}
          name={formControlName ?? ''}
          className={`input ${inputClass ?? ''} ${classNames({ invalid: isFormFieldInvalid(formControlName) })}`}
          type={type ?? 'text'}
          min={min}
          max={max}
          value={value}
          step={step}
          placeholder={t(placeholder ?? '')}
          readOnly={readonly}
          autoComplete="off"
          maxLength={maxLength}
          onChange={handleChange}
          disabled={disabled}
        />
        {isTypeNumber && (
          <Button handleClick={e => handleStepChange(e, true)}>
            <FaPlus />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Input;
