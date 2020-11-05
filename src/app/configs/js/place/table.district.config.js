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
    vehRegNum: {
      title: 'EČV'
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
