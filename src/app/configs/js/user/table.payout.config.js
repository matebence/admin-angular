import tableConfig from '../../json/ng-table/table.config.json';

export default {
  ...tableConfig,
  columns: {
    payoutId: {
      title: 'ID'
    },
    users: {
      title: 'Používateľ',
      filter: false,
      valuePrepareFunction: (users) => {
        return `${users.firstName} ${users.lastName}, ${users.places.country}, ${users.places.place}, ${users.places.street}`;
      }
    },
    iban: {
      title: 'IBAN'
    },
    amount: {
      title: 'Čiastka'
    },
    accapted: {
      title: 'Schválené',
      filter: false,
      valuePrepareFunction: (accapted) => {
        return accapted ? 'Áno' : 'Nie';
      }
    },
  }
};
