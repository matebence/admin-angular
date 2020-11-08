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
    vehRegNum: {
      title: 'EČV'
    },
    code: {
      title: 'Kód'
    },
    region: {
      title: 'Kraj',
      filter: false,
      valuePrepareFunction: (region) => {
        return `${region.name}`;
      }
    }
  }
};
