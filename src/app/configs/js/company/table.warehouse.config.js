import tableConfig from '../../json/ng-table/table.config.json';

export default {
  ...tableConfig,
  columns: {
    _id: {
      title: 'ID'
    },
    name: {
      title: 'Názov'
    },
    country: {
      title: 'Štát'
    },
    address: {
      title: 'Adresa'
    },
    regions: {
      title: 'Kraje',
      filter: false,
      valuePrepareFunction: (regions) => {
        return `${regions.map(e => e.name).join(', ')}`;
      }
    }
  }
};
