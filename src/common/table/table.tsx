import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import Button from '../Button';
import { v4 as uuidv4 } from 'uuid';
import { icons } from './table.icons';
import { ITableColumns, ITableIconsType } from './table.model';

interface TableProps {
  action: (e?: any) => void;
  buttonsIcons?: ITableIconsType[];
  columns?: ITableColumns[];
  value?: any[];
}

const Table = ({ columns, value, buttonsIcons, action }: TableProps) => {
  const actionBodyTemplate = (rowData: any): JSX.Element => (
    <div className="table-buttons-actions">
      {buttonsIcons?.map(key => (
        <Button key={uuidv4()} tooltip={`buttons.${key.toLowerCase()}`} round handleClick={() => action({ rowData, type: key })}>
          {icons[key.toLowerCase()]}
        </Button>
      ))}
    </div>
  );

  const bodyTemplate = (rowData: any, field: string): JSX.Element => <span>{rowData[field]}</span>;

  return (
    <DataTable className="table-component" value={value}>
      {columns?.map(col =>
        col.header === 'action' ? (
          <Column key={uuidv4()} body={actionBodyTemplate} exportable={false} />
        ) : (
          <Column key={uuidv4()} field={col.field} header={col.header} body={rowData => bodyTemplate(rowData, col.field as string)} />
        )
      )}
    </DataTable>
  );
};
export default Table;
