import tableConfig from '../../json/ng-table/table.config.json';

export default {
  ...tableConfig,
  columns: {
    id: {
      title: 'ID',
      addable: false,
      editable: false
    },
    name: {
      title: 'Názov'
    },
    shortcut: {
      title: 'ISO 3166-2:SK'
    }
  }
};
