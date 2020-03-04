import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs/Observable";
import { UserDataService } from "./user-data.service";

@Injectable({
  providedIn: "root"
})
export class AuthguardService implements CanActivate {
  constructor(private _router: Router, private _userData: UserDataService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this._userData.getUserData) {
      return true;
    }
    this._router.navigateByUrl("/auth/login");
  }
}
