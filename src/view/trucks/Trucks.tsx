import Table from 'common/table/table';
import { ITableIconsType } from 'common/table/table.model';
import HttpService from 'core/http/http.service';
import { useEffect, useState } from 'react';
import { ITrucks } from './Trucks.model';
import TrucksEditModal from './TrucksEditModal';
import { IModalType, MODAL_TYPE } from 'shared/utils';
import { useLoading } from 'core/loading/LoadingContext';
import Button from 'common/Button';
import TreeView from 'common/tree-view';
import { selectDict } from './Form.config';

const { ADD } = MODAL_TYPE;

interface IDataThree {
  key?: string;
  value?: any[];
}

const Trucks = () => {
  const [columns, setColumns] = useState<any[]>([]);
  const [tableData, setTableData] = useState<ITrucks[]>([]);
  const [data, setData] = useState<any>({});
  const [dataThree, setDataThree] = useState<IDataThree[]>([]);
  const [type, setType] = useState<IModalType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { setIsLoading } = useLoading();

  const dataCol = [
    { field: 'code', header: 'Code' },
    { field: 'name', header: 'Name' },
    { field: 'status', header: 'Status' },
    { field: 'description', header: 'Description' },
    { header: 'action' },
  ];

  const buttonsIcons: ITableIconsType[] = ['VIEW', 'EDIT', 'DELETE'];

  useEffect(() => {
    setColumns(dataCol);
    fetchTrucks();
  }, [isModalOpen]);

  const fetchTrucks = () => {
    setIsLoading(true);
    new HttpService()
      .service()
      .get('/trucks')
      .then(response => {
        setTableData((response as ITrucks[]) ?? []);
        setDataThree(createThreeData(response as ITrucks[]));
        setIsLoading(false);
      })
      .catch(() => {});
  };

  const action = (e: any): void => {
    setData(e.rowData);
    setType(e.type);
    setIsModalOpen(true);
  };

  const addTruck = (): void => {
    setData({});
    setType(ADD);
    setIsModalOpen(true);
  };

  const createThreeData = (data: ITrucks[]): IDataThree[] => {
    let currentData: { [key: string]: ITrucks[] } = {};
    let outData: IDataThree[] = [];
    data?.forEach(item => {
      if (!currentData[item.status]) {
        currentData[item.status] = [];
      }
      currentData[item.status].push(item);
    });
    selectDict.forEach(el => {
      const { displayName } = el || {};
      outData.push({
        key: displayName,
        value: currentData?.[displayName] ?? [],
      });
    });
    return outData ?? [];
  };

  return (
    <div className="p-4">
      <h1 className="title">Trucks</h1>
      <Button customClass={'filled flat my-4'} name={'buttons.add'} handleClick={() => addTruck()} />
      <Table columns={columns ?? []} value={tableData ?? []} action={action} buttonsIcons={buttonsIcons} />
      <div className="flex-center bg-white">
        <TreeView data={dataThree ?? []} />
      </div>
      {isModalOpen ? <TrucksEditModal type={type as IModalType} id={data.id} setVisible={setIsModalOpen} visible={isModalOpen} /> : <></>}
    </div>
  );
};

export default Trucks;
