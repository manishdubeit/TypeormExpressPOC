import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable({
  providedIn: "root"
})
export class UserDataService {
  private userData: any = {};
  public permissionNotification = new BehaviorSubject<any>(this.userData);
  public LS = {
    get: (key: string) => {
      return JSON.parse(window.sessionStorage.getItem(key));
    },
    set: (key: string, value) => {
      return sessionStorage.setItem(key, JSON.stringify(value));
    },
    remove: (key: string) => {
      return sessionStorage.removeItem(key);
    }
  };

  constructor(private _router: Router) {
    try {
      const data = this.LS.get("bawUserData");
      this.userData = data;
      this.triggerPermission();
    } catch (e) {
      console.log("Token is not in sessionStorage");
    }
  }

  triggerPermission() {
    if ("permissions" in this.userData) {
      this.permissionNotification.next(this.userData);
    }
  }

  set setUserData(data: any) {
    this.userData = data;
    this.permissionNotification.next(this.userData);
    this.LS.remove("bawUserData");
    this.LS.set("bawUserData", this.userData);
  }

  get getUserData() {
    return this.userData;
  }

  signOut() {
    sessionStorage.removeItem("bawUserData");
    sessionStorage.clear();
    this._router.navigateByUrl("/auth/login");
  }

  childrenPermission(
    parent: string,
    parentChildren?: string,
    roleGuard?: boolean,
    crudGuard?: string
  ): boolean | object {
    console.log("permission", parent, parentChildren);
    const userPermission = this.userData.permissions;
    for (const item in userPermission) {
      if (item === parent) {
        if ("children" in userPermission[item]) {
          const children = userPermission[item].children;
          for (const child in children) {
            if (child === parentChildren) {
              if (roleGuard) {
                if (children[child].has_access) {
                  return true;
                }
                return false;
              }
              if (crudGuard === "add") {
                const crudAdd = children[child].perms;
                if (crudAdd.c) {
                  return true;
                }
                return false;
              }
              if (crudGuard === "edit") {
                const crudAdd = children[child].perms;
                if (crudAdd.u) {
                  return true;
                }
                return false;
              }
              return children[child].perms;
            }
          }
        } else {
          if (roleGuard) {
            if (userPermission[item].has_access) {
              return true;
            }
            return false;
          }
          console.log(item, userPermission[item], "it doesnt have children");
          return userPermission[item].perms;
        }
      }
    }
  }

  getPermissionCrud(url: string): object {
    const parent = "/" + url.split("/")[1];
    return this.childrenPermission(parent, url) as object;
  }

  getUserCenters() {
    if ("center_id" in this.userData) {
      return {
        isCenter: this.userData.center_id ? true : false,
        center_id: this.userData.center_id,
        center_name: this.userData.center_name
      };
    }
  }
}
