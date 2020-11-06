import tableConfig from '../../json/ng-table/table.config.json';

export default {
  ...tableConfig,
  columns: {
    id: {
      title: 'ID'
    },
    name: {
      title: 'Názov'
    },
    shortcut: {
      title: 'ISO 3166-2:SK'
    }
  }
};
