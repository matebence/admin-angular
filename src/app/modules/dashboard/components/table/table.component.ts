import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit {

  public settings: any;

  data = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz'
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv'
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv'
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv'
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv'
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv'
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv'
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv'
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv'
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv'
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv'
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv'
    },

    {
      id: 11,
      name: 'Nicholas DuBuque',
      username: 'Nicholas.Stanton',
      email: 'Rey.Padberg@rosamond.biz'
    }
  ];

  public constructor() {
  }

  public ngOnInit(): void {
    this.initDataTableSettings();
    this.defineDataTableStructure();

    return;
  }

  private defineDataTableStructure(): void {
    this.settings = {
      ...this.settings,
      columns: {
        id: {
          title: 'ID'
        },
        name: {
          title: 'Full Name',
          type: 'html',
          editor: {
            type: 'list',
            config: {
              list: [
                {value: true, title: 'Valid'},
                {value: false, title: 'Not valid'}
              ],
            },
          }
        },
        username: {
          title: 'User Name'
        },
        email: {
          editable: false,
          addable: false,
          title: 'Email'
        }
      }
    };
  }

  public onCreateConfirm(event): void {
    if (window.confirm('Create new data?')) {
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  public onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  public onSaveConfirm(event): void {
    if (window.confirm('Are you sure you want to save?')) {
      event.newData['name'] += ' + added in code';
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  private initDataTableSettings(): void {
    this.settings = {
      pager: {
        display: true,
        perPage: 8
      },
      actions: {
        columnTitle: 'Možnosti'
      },
      add: {
        addButtonContent: '<i class="fas fa-plus-squarev></i>',
        createButtonContent: '<i class="fas fa-check-square"></i>',
        cancelButtonContent: '<i class="fas fa-window-close"></i>',
        confirmCreate: true
      },
      edit: {
        editButtonContent: '<i class="fas fa-edit"></i>',
        saveButtonContent: '<i class="fas fa-check-square"></i>',
        cancelButtonContent: '<i class="fas fa-window-close"></i>',
        confirmSave: true
      },
      delete: {
        deleteButtonContent: '<i class="fas fa-minus-square"></i>',
        confirmDelete: true
      }
    }
  }
}
