import tableConfig from '../../json/ng-table/table.config.json';

export default {
  ...tableConfig,
  columns: {
    _id: {
      title: 'ID'
    },
    courier: {
      title: 'Kuriér',
      valuePrepareFunction: (courier) => {
        return `${courier.userName}`;
      }
    },
    parcelId: {
      title: 'Číslo balíka',
    },
    from: {
      title: 'Odkial',
    },
    to: {
      title: 'Kam',
    },
    price: {
      title: 'Cena',
    },
    status: {
      title: 'Status',
      filter: false,
      valuePrepareFunction: (status) => {
        return `${status.name}`;
      }
    }
  }
};
