import { Dialog } from 'primereact/dialog';
import { Dispatch, ReactNode, SetStateAction, useCallback, useMemo } from 'react';
import Button, { IButtonComponent } from './Button';
import { v4 as uuidv4 } from 'uuid';

interface IProps {
  title?: string;
  customClass?: string;
  visible?: boolean;
  setVisible?: Dispatch<SetStateAction<boolean>>;
  action: (key?: string) => void;
  children?: ReactNode;
  isDefaultButtons?: boolean;
  disableOkButton?: boolean;
}

const Modal = ({ title, customClass, visible, setVisible, action, isDefaultButtons = true, disableOkButton, children }: IProps) => {
  const headerElement = useMemo(() => <h3 className="modal-title">{title}</h3>, [title]);

  const defaultButtons: IButtonComponent[] = [
    {
      name: 'buttons.save',
      key: 'SAVE',
      customClass: 'flat filled mr-2',
    },
    {
      name: 'buttons.cancel',
      key: 'CANCEL',
      customClass: 'filled',
    },
  ];

  const buttons = useMemo(() => (isDefaultButtons ? defaultButtons : []), [isDefaultButtons]);

  const handleVisible = useCallback(() => {
    setVisible?.(false);
  }, [setVisible]);

  return (
    <Dialog
      draggable={true}
      visible={visible}
      modal
      className={`modal ${customClass || ''}`}
      headerClassName="modal-header"
      contentClassName="modal-content"
      header={headerElement}
      style={{ width: '50vw' }}
      onHide={handleVisible}
    >
      <div className="modal-body">
        {children}

        {isDefaultButtons && (
          <div className="buttons-actions">
            {buttons.map((btn, i) => (
              <Button
                key={uuidv4()}
                disabled={i === 0 && disableOkButton}
                customClass={btn.customClass}
                name={btn.name}
                handleClick={() => action(btn.key)}
              />
            ))}
          </div>
        )}
      </div>
    </Dialog>
  );
};

export default Modal;
