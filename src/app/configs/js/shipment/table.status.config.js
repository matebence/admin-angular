import tableConfig from '../../json/ng-table/table.config.json';

export default {
  ...tableConfig,
  columns: {
    _id: {
      title: 'ID'
    },
    name: {
      title: 'Názov'
    }
  }
};
