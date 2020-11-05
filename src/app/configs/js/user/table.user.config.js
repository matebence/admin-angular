import tableConfig from '../../json/ng-table/table.config.json';

export default {
  ...tableConfig,
  columns: {
    userId: {
      title: 'ID',
      addable: false,
      editable: false
    },
    accountId: {
      title: 'ID používateľa'
    },
    email: {
      title: 'Email',
      addable: false,
      editable: false
    },
    userName: {
      title: 'Používateľské meno',
      addable: false,
      editable: false
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
      filter: false,
      title: 'Tel. číslo'
    },
    balance: {
      filter: false,
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
