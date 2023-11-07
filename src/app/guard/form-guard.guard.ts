import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { SaveData } from '../save-data-interface';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class FormGuardGuard implements CanDeactivate<SaveData> {
  constructor(private dialog: MatDialog) {}
  canDeactivate(
    component: SaveData
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!component.isDataSaved()) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent);
      return dialogRef.afterClosed();
    }
    return of(true);
  }
}
