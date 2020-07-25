import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { UserDetailService } from './UserDetail.service';
import { userdetails } from './user-detail.modal';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {

  search$ = new Subject<KeyboardEvent>();
  unsubscribe = new Subject();

  userDetails: userdetails[] = [];
  repositoryInfo = [];

  totalCount: number = 0;
  curIndex: number;
  searhName: any;

  constructor(
    private _service: UserDetailService
  ) { }

  ngOnInit(): void {
    this.search$.pipe(
      debounceTime(500),
      distinctUntilChanged()).
      subscribe((searchVal) => {
        this.searhName = searchVal;
        this.getUsers(1, 5);
      });
  }

  /**
   * 
   * @param pageIndex 
   * @param pageSize 
   */
  getUsers(pageIndex: number, pageSize: number): void {
    this._service.getDetails(this.searhName, pageIndex, pageSize).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      this.userDetails = res.items;
      this.totalCount = res.total_count;
    });
  }

  /**
   * Purpose: get users details
   * @param username 
   * @package index
   */
  getDetail(username: string, index: number): void {
    this.curIndex = index;
    this._service.userInfo(username).pipe(takeUntil(this.unsubscribe)).subscribe((val) => {
      this.repositoryInfo = val;
    });
  }

  /**
   * 
   * @param type 
   */
  compare(type: string) {
    return function sortAccording(a, b) {
      let nameA = a.login.toUpperCase();
      let nameB = b.login.toUpperCase();
      let _compare = 0;
      if (nameA < nameB) {
        _compare = -1;
      }
      if (nameA > nameB) {
        _compare = 1;
      }
      return (
        type === 'az' ? _compare : (_compare * -1)
      );
    }
  }

  /**
   * 
   * @param sortType 
   */
  sortArray(sortType: string): void {
    if (sortType === 'asc') {
      this.userDetails = this.userDetails.sort((a, b) => { return a.score - b.score; });
    } else if (sortType === 'desc') {
      this.userDetails = this.userDetails.sort((a, b) => { return b.score - a.score; });
    } else {
      this.userDetails = this.userDetails.sort(this.compare(sortType));
    }
    this.repositoryInfo = [];
  }

  /**
   * 
   * @param event 
   */
  pageInfo(event): void {
    this.getUsers((event.pageIndex + 1), event.pageSize);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
