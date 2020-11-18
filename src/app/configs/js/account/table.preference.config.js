import tableConfig from '../../json/ng-table/table.config.json';

export default {
  ...tableConfig,
  columns: {
    preferenceId: {
      title: 'ID'
    },
    name: {
      title: 'Názov'
    },
    value: {
      title: 'Hodnoty (numerické)',
      filter: false,
      valuePrepareFunction: (cell, row) => {
        return `${row.accountPreferences.filter(f => f.value !== null).map(e => e.value).join(', ')}`
      }
    },
    isSet: {
      title: 'Hodnoty (logické)',
      filter: false,
      valuePrepareFunction: (cell, row) => {
        return `${row.accountPreferences.filter(f => f.isSet !== null).map(e => e.isSet).join(', ')}`
      }
    },
    content: {
      title: 'Hodnoty (slovné)',
      filter: false,
      valuePrepareFunction: (cell, row) => {
        return `${row.accountPreferences.filter(f => f.content !== null).map(e => e.content).join(', ')}`
      }
    }
  }
};
