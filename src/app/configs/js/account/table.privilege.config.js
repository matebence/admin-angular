import tableConfig from '../../json/ng-table/table.config.json';

export default {
  ...tableConfig,
  columns: {
    privilegeId: {
      title: 'ID'
    },
    name: {
      title: 'Názov'
    }
  }
};
