import tableConfig from '../../json/ng-table/table.config.json';

export default {
  ...tableConfig,
  columns: {
    _id: {
      title: 'ID'
    },
    account: {
      title: 'Konto'
    },
    invoice: {
      title: 'Faktúra',
      type: 'html',
      filter: false,
      valuePrepareFunction: (cell, row) => {
        return `<a href='manage/dashboard/services/shipments/invoices/${row._id}'>Stiahnúť faktúru</a>`;
      }
    }
  }
};
