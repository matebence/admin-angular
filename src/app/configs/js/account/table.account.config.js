import tableConfig from '../../json/ng-table/table.config.json';

let roles = [];

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
        return `${new Date(login.lastLogin)}`;
      }
    },
    accountRoles: {
      title: 'Rola',
      filter: false,
      valuePrepareFunction: (accountRoles) => {
        const role = accountRoles.find(f => f.roles.hasOwnProperty('rolePrivileges'));
        if (role !== undefined) {
          roles.push(role);
          return `${role.roles.name}`;
        } else {
          const role = accountRoles.pop();
          return `${roles.find(e => e.roles.roleId === role.roles).roles.name}`;
        }
      }
    }
  }
};
