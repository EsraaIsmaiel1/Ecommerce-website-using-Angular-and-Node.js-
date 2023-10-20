import { VisibilityNavFooterService } from './../../service/visibility-nav-footer.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {
  constructor(private VisibilityNavFooterService: VisibilityNavFooterService) { }

  ngOnInit() {
    this.VisibilityNavFooterService.showHeader$.next(false);
    this.VisibilityNavFooterService.showFooter$.next(false);
  }
  goBackHome() {
    this.VisibilityNavFooterService.showHeader$.next(true);
    this.VisibilityNavFooterService.showFooter$.next(true);
}
}
