import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loaderChange = new Subject<boolean>();

  changeLoader(state: boolean) {
    this.loaderChange.next(state)
  }
}
