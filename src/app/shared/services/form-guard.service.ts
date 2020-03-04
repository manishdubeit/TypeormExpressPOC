import { Injectable } from "@angular/core";
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs/Observable";

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: "root"
})
export class FormGuardService implements CanDeactivate<CanComponentDeactivate> {
  constructor() {}

  canDeactivate(
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate();
  }
}
