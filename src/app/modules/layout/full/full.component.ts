import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    ) { }

  ngOnInit(): void {
  }

  goTo(url) {
    this.router.navigate([url], { relativeTo: this.activatedRoute });
  }

}
