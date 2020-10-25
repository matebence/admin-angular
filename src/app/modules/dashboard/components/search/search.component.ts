import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import navigationConfig from '../../../../configs/navigation.config.json';

import {Details, Navigation, NavigationResult} from '../../../../shared/models/components/navigation.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @ViewChild('searchInput', {static: false}) searchInputEl: ElementRef;

  public keyWord: string;
  public selectedResults: string[] = [];
  public searchResult: NavigationResult = {group: [], title: [], action: []};

  public constructor() {
  }

  public ngOnInit(): void {
    return;
  }

  public onAutoCompleteSelection(result: string): void {
    this.selectedResults.push(result.toLowerCase());
    this.keyWord = this.selectedResults.join(':');
    this.searchResult = {group: [], title: [], action: []};
    this.searchInputEl.nativeElement.focus();
    if (this.selectedResults.length > 2) this.selectedResults = [];
  }

  public onAutoComplete(): void {
    if (this.keyWord.length === 0) return;
    try {
      const segments: string[] = this.keyWord.split(':');
      const group: string = segments.shift();
      const navigation: Navigation[] = navigationConfig.filter(e => e.group.toLowerCase().includes(group));

      if (navigation.length === 0 || segments.length < 1) {
        this.searchResult = {group: navigation, title: [], action: []};
      } else {
        const selectedNavigation: Navigation = navigation.pop();
        const service: string = segments.shift();
        const details: Details[] = selectedNavigation.details.filter(e => e.title.toLowerCase().includes(service));

        if (details.length === 0 || segments.length < 1) {
          this.searchResult = {group: selectedNavigation.group, title: details, action: []};
        } else {
          const selectedDetail: Details = details.pop();
          const section: string = segments.shift();
          const result: Details[] = selectedDetail.route.sub.filter(e => e.title.toLowerCase().includes(section));

          this.searchResult = {group: selectedNavigation.group, title: selectedDetail.title, action: result};
        }
      }
    } catch (e) {
      return;
    }
  }
}
