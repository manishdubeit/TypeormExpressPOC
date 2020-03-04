import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { FullComponent } from "./full/full.component";
import { BlankComponent } from "./blank/blank.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";

@NgModule({
  declarations: [
    FullComponent,
    BlankComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule, // because we used <router-outlet> and routerLink
  ],
  providers: [

  ],
})
export class CoreModule {}
