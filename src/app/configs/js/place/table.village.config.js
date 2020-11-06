import tableConfig from '../../json/ng-table/table.config.json';

export default {
  ...tableConfig,
  columns: {
    id: {
      title: 'ID'
    },
    fullName: {
      title: 'Názov'
    },
    district: {
      title: 'Okres',
      filter: false,
      valuePrepareFunction: (district) => {
        return `${district.name}`;
      }
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
