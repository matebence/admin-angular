import { Component, OnInit } from '@angular/core';

/*
 Error page is working without directive and routerlink(plain html & css)
 - routerlink is done via href
 - hover is done via css :hover
 */

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
