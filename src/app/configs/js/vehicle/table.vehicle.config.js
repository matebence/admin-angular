import tableConfig from '../../json/ng-table/table.config.json';

export default {
  ...tableConfig,
  columns: {
    _id: {
      title: 'ID',
      addable: false,
      editable: false
    },
    name: {
      title: 'Názov'
    },
    type: {
      title: 'Typ',
      filter: false,
      valuePrepareFunction: (type) => {
        return `${type.name}`;
      }
    },
    courier: {
      title: 'Majitel',
      filter: false,
      valuePrepareFunction: (courier) => {
        return `${courier.userName}`;
      }
    }
  }
};
