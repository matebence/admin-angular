import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.css']
})
export class DashboardPage implements OnInit {

  public toggle: boolean = false;

  public negativeButton: string = 'Zrušiť';
  public pozitiveButton: string = 'Odhlasiť sa';
  public title: string = 'Odhlásenie z aplikácie';
  public text: string = 'Pre odhlásenie prosím stlačte "Odhlásiť sa", v opačnom prípade možete ešte operáciu prerušiť pomcou tlačidla "Zrušiť"';

  public constructor(private router: Router) {
  }

  public ngOnInit(): void {
    return;
  }

  public onToogleResult(status: boolean): void {
    this.toggle = status;
    return;
  }

  public onModalResult(result: boolean): void {
    if (result) {
      this.router.navigate(['/auth/sign-out']);
    } else {
      console.log('Dialog dismissed');
    }
    return;
  }
}
