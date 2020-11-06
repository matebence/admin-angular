import tableConfig from '../../json/ng-table/table.config.json';

export default {
  ...tableConfig,
  columns: {
    paymentId: {
      title: 'ID'
    },
    users: {
      title: 'Používateľ',
      filter: false,
      valuePrepareFunction: (users) => {
        return `${users.firstName} ${users.lastName}, ${users.places.country}, ${users.places.place}, ${users.places.street}`;
      }
    },
    creditCard: {
      title: 'Kreditná karta'
    },
    charge: {
      title: 'Poplatok'
    },
    amount: {
      title: 'Čiastka'
    },
    currency: {
      title: 'Mena'
    },
    refunded: {
      title: 'Vrátené',
      filter: false,
      valuePrepareFunction: (accapted) => {
        return accapted ? 'Áno' : 'Nie';
      }
    },
  }
};
