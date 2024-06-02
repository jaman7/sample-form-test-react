import { Fragment } from 'react/jsx-runtime';

interface IDataThree {
  key?: string;
  value?: any[];
}

interface IProps {
  data?: IDataThree[];
}

const TreeView = (props: IProps) => {
  const { data = [] } = props || {};

  return (
    <div className="tree-view">
      {data?.map(group => (
        <Fragment key={group.key}>
          <div className="status-label">{group.key}</div>
          {group?.value?.map(item => (
            <div key={item.id} className="status-group">
              <div className="item">
                <div className="item-code">{item?.code}</div>
                <div className="item-name">{item?.name}</div>
              </div>
            </div>
          ))}
        </Fragment>
      ))}
    </div>
  );
};

export default TreeView;
