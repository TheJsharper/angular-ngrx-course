import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Course} from '../model/course';
import {CoursesService} from '../services/courses.service';
import {debounceTime, distinctUntilChanged, startWith, tap, delay} from 'rxjs/operators';
import {merge, fromEvent, Observable} from 'rxjs';
import {LessonsDataSource} from '../services/lessons.datasource';
import {select, Selector, Store} from '@ngrx/store';
import {AppState} from '../../reducers/index';
import {PageQuery} from '../course.actions';
import {selectLessonsLoading} from '../course.selectors';
import {LessonsState} from '../lessons.reducers';


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements OnInit, AfterViewInit {

  course: Course;

  dataSource: LessonsDataSource;

  displayedColumns: string[] = ['seqNo', 'description', 'duration'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  loading$: Observable<boolean>;

  constructor(private route: ActivatedRoute,
              private coursesService: CoursesService, private store: Store<AppState>) {

  }

  ngOnInit() {

    this.course = this.route.snapshot.data['course'];
    this.loading$ = this.store.pipe(
      select(<Selector<LessonsState, boolean>>selectLessonsLoading));

    this.dataSource = new LessonsDataSource(this.coursesService, this.store);
    //   this.dataSource.loadLessons(this.course.id, 0, 3);
    const initialPage: PageQuery = {
      pageIndex: 0,
      pageSize: 3
    };
    this.dataSource.loadLessons(this.course.id, initialPage);
  }

  ngAfterViewInit() {

    this.paginator.page
      .pipe(
        tap(() => this.loadLessonsPage())
      )
      .subscribe();

  }

  loadLessonsPage() {
    const nextPage: PageQuery = {
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize
    };
    this.dataSource.loadLessons(
      this.course.id, nextPage);
  }


}
