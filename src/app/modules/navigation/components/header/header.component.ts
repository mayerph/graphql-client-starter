import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LoaderService } from 'src/app/modules/loader/services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  loaderChange: Subscription
  isLoading = false

  constructor(
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.loaderChange = this.loaderService.loaderChange.subscribe(() => {
      this.toggleLoader()
    })
  }

  toggleLoader(): void {
    this.isLoading = !this.isLoading
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
}
