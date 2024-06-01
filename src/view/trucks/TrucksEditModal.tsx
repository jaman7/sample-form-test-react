import { useEffect, useState, Dispatch as ReactDispatch, SetStateAction, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FormikProps, useFormik } from 'formik';
import { IModalType, MODAL_TYPE } from 'shared/utils';
import { ButtonsKeys } from 'shared/utils/enums/buttons';
import { IFormElements } from 'common/formElements/FormElements.model';
import HttpService from 'core/http/http.service';
import { createConfigForm } from 'shared/utils/helpers';
import { useLoading } from 'core/loading/LoadingContext';
import Modal from 'common/Modal';
import FormElements from 'common/formElements/FormElements';
import { dictionaries, formConfigTrucks, validationSchema } from './Form.config';
import { ITrucks } from './Trucks.model';
import { IDictType } from 'common/select/Select.model';

interface IProps {
  id?: number;
  type?: IModalType;
  visible?: boolean;
  setVisible?: ReactDispatch<SetStateAction<boolean>>;
}

const { ADD, EDIT, VIEW } = MODAL_TYPE;
const { SAVE, CANCEL } = ButtonsKeys;

const TrucksEditModal = ({ setVisible, visible, type, id }: IProps) => {
  const [modalType, setModalType] = useState<IModalType>('EDIT');
  const [data, setData] = useState<any>({});
  const [formConfig, setFormConfig] = useState<IFormElements[]>([]);
  const { t } = useTranslation();
  const { name, code } = data || {};
  const http = new HttpService();
  const { setIsLoading } = useLoading();

  const translatePrefix = 'trucks.modal';

  const formik: FormikProps<any> = useFormik({
    initialValues: { name: null },
    validationSchema,
    onSubmit: () => {},
  });

  useEffect(() => {
    setModalType(type as IModalType);
  }, [type]);

  useEffect(() => {
    setFormConfig(createConfigForm(formConfigTrucks, { prefix: `${translatePrefix}.form`, isDisableAll: modalType === VIEW }));
  }, [modalType]);

  useEffect(() => {
    if (modalType === VIEW || modalType === EDIT) {
      fetchData(id as number);
    }
  }, [id, modalType]);

  const fetchData = (id: number) => {
    setIsLoading(true);
    http
      .service()
      .get('/trucks/' + id)
      .then(res => {
        const { status, ...rest } = res || {};
        const statusId = dictionaries?.selectDict?.find(el => el.displayName === status)?.id ?? null;
        const data = { ...rest, statusId };
        setData(data);
        formik.setValues(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const sendSettings = (data: ITrucks) => {
    const { id, statusId, ...rest } = data ?? {};
    setIsLoading(true);
    const action = modalType === ADD ? http.service().post('/trucks', rest) : http.service().put('/trucks/' + id, { id, ...rest });
    action
      .then(user => {
        setData(user);
        formik.setValues(user);
        setIsLoading(false);
        setVisible?.(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const config = useMemo(() => formConfig, [formConfig]);

  const modalTitle = (): string =>
    useMemo(() => {
      const codeName = (modalType === VIEW || modalType === EDIT) && code ? `${code}` : '';
      return t(translatePrefix + '.' + modalType?.toLowerCase(), { value: `${codeName}` });
    }, [name, code, modalType]);

  const onClick = (key: any) => {
    const status = dictionaries?.selectDict?.find(el => el.id === formik.values.statusId)?.displayName ?? null;
    switch (key) {
      case SAVE:
        sendSettings({ ...data, ...formik.values, status });
        break;
      case CANCEL:
        setVisible?.(false);
        break;
      default:
        break;
    }
  };

  const itemsConfig = (data: any): any => ({
    ...data,
    disabled: modalType === VIEW,
    dictData: filteringDict(dictionaries?.[data?.dictName] ?? []),
  });

  const filteringDict = (dict: IDictType[]) => {
    let ids: number[] = [];
    const { statusId } = formik.values || {};
    switch (statusId) {
      case 1:
        ids = [1, 2, 5];
        break;
      case 2:
        ids = [2, 3, 5];
        break;
      case 3:
        ids = [3, 4, 5];
        break;
      case 4:
        ids = [1, 4, 5];
        break;
      default:
        break;
    }
    return dict.filter(el => (ids?.length ? ids?.indexOf(el?.id as number) > -1 : true));
  };

  return (
    <Modal
      setVisible={setVisible}
      visible={visible}
      title={modalTitle()}
      action={onClick}
      isDefaultButtons={modalType === ADD || modalType === EDIT}
      disableOkButton={!formik.isValid}
    >
      <div className="modal-user-admin">
        <form className="board-modal">
          {config?.map((item, i) => (
            <div key={`cell-${i}`} className="items">
              <FormElements formControlName={item.formControlName} formik={formik} config={itemsConfig(item.config)} />
            </div>
          ))}
        </form>
      </div>
    </Modal>
  );
};

export default TrucksEditModal;
