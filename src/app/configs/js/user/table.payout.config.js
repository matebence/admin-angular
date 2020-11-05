import tableConfig from '../../json/ng-table/table.config.json';

export default {
  ...tableConfig,
  columns: {
    payoutId: {
      title: 'ID',
      addable: false,
      editable: false
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
      valuePrepareFunction: (accapted) => {
        return accapted ? 'Áno' : 'Nie';
      }
    },
  }
};
