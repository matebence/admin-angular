import {Router} from '@angular/router';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import navigationConfig from '../../../../configs/navigation.config.json';

import {Details, Navigation, NavigationResult} from '../../../../shared/models/components/navigation.model';

import {SecurityService} from '../../services/security-service/security.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @ViewChild('searchInputEl', {static: false}) searchInputElRef: ElementRef;
  @ViewChild('searchResultEl', {static: false}) searchResultElRef: ElementRef;

  public keyWord: string;
  public selectedIndex: number = -1;
  public searchResult: NavigationResult[] = [];

  public constructor(private router: Router,
                     private securityService: SecurityService) {
  }

  public ngOnInit(): void {
    return;
  }

  public onKeyNavigation(keyboardEvent: KeyboardEvent): void {
    if (keyboardEvent.key === 'Escape') {
      this.onClearSearchResult();
    } else if (keyboardEvent.key === 'Enter') {
      const element: any = this.searchResultElRef.nativeElement.children[this.selectedIndex].children[0];
      this.onSelectedResult({result: element.innerText, route: element.href.replace(element.origin, '')});
      this.selectedIndex = -1;
    } else if (keyboardEvent.key === 'ArrowDown') {
      const element: any = this.searchResultElRef.nativeElement.children;
      if (this.selectedIndex < element.length - 1) {
        this.selectedIndex++;
        element[this.selectedIndex].classList.add('keyNavigation');
      }
      if (this.selectedIndex > 0) {
        element[this.selectedIndex - 1].classList.remove('keyNavigation');
      }
    } else if (keyboardEvent.key === 'ArrowUp') {
      if (this.selectedIndex > 0) {
        const element: any = this.searchResultElRef.nativeElement.children;
        element[this.selectedIndex].classList.remove('keyNavigation');
        this.selectedIndex--;
        element[this.selectedIndex].classList.add('keyNavigation');
      }
    }
    return;
  }

  public onSelectedResult(result: NavigationResult): void {
    const segments = this.keyWord.split(':');
    this.searchInputElRef.nativeElement.focus();

    if (segments.length === 1) {
      this.keyWord = result.result;
      return;
    } else if (segments.length === 2) {
      segments.push(result.result);
    } else if (segments.length === 3) {
      segments.push(result.result);
    }

    this.keyWord = segments.filter(e => e.length > 0).join(':');
    if (result.route !== '') this.router.navigate([result.route]);
    return;
  }

  public onAutoComplete(): void {
    try {
      let index = 0;
      if (this.keyWord.length === index) return;
      const segments: string[] = this.keyWord.split(':');
      const navigation: Navigation[] = navigationConfig.filter(e => e.group.toLowerCase().includes(segments[index].toLowerCase()));
      this.searchResult = navigation.map(e => {
        return {result: e.group, route: ''}
      });

      index++;

      if (segments.length < index + 1) return;
      const details: Details[] = navigation.pop().details.filter(e => e.title.toLowerCase().includes(segments[index].toLowerCase()));
      this.searchResult = details.map(e => {
        return {result: e.title, route: ''}
      });

      index++;

      if (segments.length < index + 1) return;
      const action: Details[] = details.pop().route.sub.filter(e => e.title.toLowerCase().includes(segments[index].toLowerCase()) && this.securityService.isInRole(e.authorities));
      this.searchResult = action.map(e => {
        return {result: e.title, route: e.route.main}
      });
    } catch (e) {
      this.searchResult = []
    }
    return;
  }

  private onClearSearchResult(): void {
    this.selectedIndex = -1;
    this.searchResult = [];
    this.keyWord = null;
    return;
  }
}
