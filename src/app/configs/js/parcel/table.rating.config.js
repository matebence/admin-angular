import tableConfig from '../../json/ng-table/table.config.json';

export default {
  ...tableConfig,
  columns: {
    id: {
      title: 'ID'
    },
    description: {
      title: 'Popis'
    },
    rating: {
      title: 'Hodnotenie',
      valuePrepareFunction: (rating) => {
        return `${rating} / 5`;
      }
    },
    parcel: {
      title: 'Číslo zásielky',
      valuePrepareFunction: (parcel) => {
        return `${parcel.id}`;
      }
    },
    image: {
      title: 'Obrázok',
      type: 'html',
      filter: false,
      valuePrepareFunction: (image) => {
        return `<a target='_blank' href='${image}'>Otvoriť obrázok</a>`;
      }
    }
  }
};
