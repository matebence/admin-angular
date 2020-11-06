import tableConfig from '../../json/ng-table/table.config.json';

export default {
  ...tableConfig,
  columns: {
    privilegeId: {
      title: 'ID'
    },
    name: {
      title: 'Názov'
    },
    value: {
      title: 'Hodnoty (numerické)',
      valuePrepareFunction: (cell, row) => {
        return `${row.accountPreferences.filter(f => f.value !== null).map(e => e.value).join(', ')}`
      }
    },
    isSet: {
      title: 'Hodnoty (logické)',
      valuePrepareFunction: (cell, row) => {
        return `${row.accountPreferences.filter(f => f.isSet !== null).map(e => e.isSet).join(', ')}`
      }
    },
    content: {
      title: 'Hodnoty (slovné)',
      valuePrepareFunction: (cell, row) => {
        return `${row.accountPreferences.filter(f => f.content !== null).map(e => e.content).join(', ')}`
      }
    }
  }
};
