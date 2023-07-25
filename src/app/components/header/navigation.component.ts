import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {TranslocoService} from "@ngneat/transloco";
import {MatRadioChange} from "@angular/material/radio";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  constructor(public dialog: MatDialog, public translateService: TranslocoService) {}

  public setLang(lang:string) {
    this.translateService.setActiveLang(lang);
  }

  public setLangEvent($event: MatRadioChange){
    this.translateService.setActiveLang($event.value.name);
    console.log($event.value.name)
  }

}

