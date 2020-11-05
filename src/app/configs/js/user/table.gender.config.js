import tableConfig from '../../json/ng-table/table.config.json';

export default {
  ...tableConfig,
  columns: {
    genderId: {
      title: 'ID',
      addable: false,
      editable: false
    },
    name: {
      title: 'Názov'
    }
  }
};
