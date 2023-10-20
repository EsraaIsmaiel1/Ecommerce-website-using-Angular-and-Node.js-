import { Component, OnInit } from '@angular/core';
import { VisibilityNavFooterService } from './service/visibility-nav-footer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

  export class AppComponent implements OnInit {
    title = 'my-website';
    visibilityNavFooterService: VisibilityNavFooterService;
  
    constructor(visibilityNavFooterService: VisibilityNavFooterService) {
      this.visibilityNavFooterService = visibilityNavFooterService;
    }
  
    ngOnInit() {
    }

}

