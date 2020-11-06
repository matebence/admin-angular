import tableConfig from '../../json/ng-table/table.config.json';

export default {
  ...tableConfig,
  columns: {
    id: {
      title: 'ID'
    },
    length: {
      title: 'Dĺžka'
    },
    width: {
      title: 'Šírka'
    },
    height: {
      title: 'Výška'
    },
    note: {
      title: 'Poznámka'
    },
    sender: {
      title: 'Odosielateľ',
      filter: false,
      valuePrepareFunction: (sender) => {
        return `${sender.name}`;
      }
    },
    receiver: {
      title: 'Prijímateľ',
      filter: false,
      valuePrepareFunction: (receiver) => {
        return `${receiver.name}`;
      }
    },
    category: {
      title: 'Kategória',
      filter: false,
      valuePrepareFunction: (category) => {
        return `${category.name}`;
      }
    }
  }
};
