import tableConfig from '../../json/ng-table/table.config.json';

let privileges = [];

export default {
  ...tableConfig,
  columns: {
    roleId: {
      title: 'ID'
    },
    name: {
      title: 'Role'
    },
    rolePrivileges: {
      title: 'Oprávnenia',
      filter: false,
      valuePrepareFunction: (rolePrivileges) => {
        const privilege = rolePrivileges.filter(f => f.privileges.hasOwnProperty('privilegeId'));
        if (privilege.length > 0) {
          if (privileges.length === 0) privileges.push(...privilege);
          return `${privilege.map(e => e.privileges.name).join(', ')}`;
        } else {
          const privilege = privileges.filter(e => rolePrivileges.some(f => f.privileges === e.privileges.privilegeId));
          return `${privilege.map(e => e.privileges.name).join(', ')}`;
        }
      }
    }
  }
};
