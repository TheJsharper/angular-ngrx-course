import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable} from 'rxjs';
import {Lesson} from '../model/lesson';
import {CoursesService} from './courses.service';
import {catchError, tap} from 'rxjs/operators';
import {AppState} from '../../reducers/index';
import {select, Selector, Store} from '@ngrx/store';
import {LessonsPageRequested, PageQuery} from '../course.actions';
import {selectLessonPage} from '../course.selectors';
import {LessonsState} from '../lessons.reducers';


export class LessonsDataSource implements DataSource<Lesson> {

  private lessonsSubject = new BehaviorSubject<Lesson[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);


  constructor(private coursesService: CoursesService, private store: Store<AppState>) {

  }

  loadLessons(courseId: number, initialPage: PageQuery) {
    this.store.pipe(
      select(<Selector<LessonsState, Lesson[]> >selectLessonPage(courseId, initialPage)),
      tap((lessons: Lesson[]) => {
        if (lessons.length > 0) {
          this.lessonsSubject.next(lessons);
        } else {

          this.store.dispatch(new LessonsPageRequested({courseId, page: initialPage}));
        }
      }),
      catchError((err: any) => {
        console.error('error happens', err);
        throw new Error(`error ocurred ${err}`);
      })
    ).subscribe();
  }

  connect(collectionViewer: CollectionViewer): Observable<Lesson[]> {
    console.log('Connecting data source');
    return this.lessonsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.lessonsSubject.complete();
    this.loadingSubject.complete();
  }

}

