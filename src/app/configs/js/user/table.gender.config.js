import tableConfig from '../../json/ng-table/table.config.json';

export default {
  ...tableConfig,
  columns: {
    genderId: {
      title: 'ID'
    },
    name: {
      title: 'Názov'
    }
  }
};
