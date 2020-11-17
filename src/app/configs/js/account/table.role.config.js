import tableConfig from '../../json/ng-table/table.config.json';

export default {
  ...tableConfig,
  columns: {
    roleId: {
      title: 'ID'
    },
    name: {
      title: 'Role'
    }
  }
};
