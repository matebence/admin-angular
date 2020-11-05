import tableConfig from '../json/table.config.json';

export default {
  ...tableConfig,
  columns: {
    genderId: {
      title: 'ID',
      addable: false,
      editable: false
    },
    name: {
      title: 'Názov'
    }
  }
};
