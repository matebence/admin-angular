import tableConfig from '../../json/ng-table/table.config.json';

export default {
  ...tableConfig,
  columns: {
    accountId: {
      title: 'ID'
    },
    userName: {
      title: 'Používateľské meno'
    },
    email: {
      title: 'Email',
    },
    login: {
      title: 'Posledné prihlásenie',
      filter: false,
      valuePrepareFunction: (login) => {
        return login === null ? ` ` : `${new Date(login.lastLogin)}`;
      }
    }
  }
};
