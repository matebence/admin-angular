import tableConfig from '../../json/ng-table/table.config.json';

export default {
  ...tableConfig,
  columns: {
    userId: {
      title: 'ID'
    },
    accountId: {
      title: 'ID používateľa'
    },
    email: {
      title: 'Email'
    },
    userName: {
      title: 'Používateľské meno'
    },
    firstName: {
      title: 'Meno'
    },
    lastName: {
      title: 'Priezvisko'
    },
    gender: {
      title: 'Pohlavie'
    },
    tel: {
      title: 'Tel. číslo'
    },
    balance: {
      title: 'Zostatok'
    },
    places: {
      title: 'Miesto',
      filter: false,
      valuePrepareFunction: (places) => {
        return `${places.country}, ${places.region}, ${places.district}, ${places.place}, ${places.street}, ${places.zip}`;
      }
    }
  }
};
