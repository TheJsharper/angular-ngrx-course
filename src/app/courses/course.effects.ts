import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  AllCoursesLoaded,
  AllCoursesRequested,
  CourseActionTypes,
  CourseLoaded,
  CourseRequested,
  LessonsPageCancelled,
  LessonsPageLoaded,
  LessonsPageRequested
} from './course.actions';
import {filter, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {CoursesService} from './services/courses.service';
import {Course} from './model/course';
import {select, Selector, Store} from '@ngrx/store';
import {AppState} from '../reducers/index';
import {allCoursesLoaded} from './course.selectors';
import {CoursesState} from './course.reducers';
import {Lesson} from './model/lesson';
import {catchError} from 'rxjs/internal/operators';
import {Observable} from 'rxjs';

@Injectable()
export class CourseEffects {
  @Effect()
  loadCourse$ = this.actions$.pipe(
    ofType<CourseRequested>(CourseActionTypes.CourseRequested.toString()),
    mergeMap((action: CourseRequested) => this.coursesService.findCourseById(action.payload.courseId)),
    map((course: Course) => new CourseLoaded({course}))
  );

  @Effect()
  loadAllCourses$ = this.actions$.pipe(
    ofType<AllCoursesRequested>(CourseActionTypes.AllCoursesRequested.toString()),
    withLatestFrom(this.store.pipe(select(<Selector<CoursesState, boolean>>allCoursesLoaded))),
    filter((value: [AllCoursesLoaded, boolean], index: number) => !value[1]),
    map((value: [AllCoursesLoaded, boolean]) => value[0]),
    mergeMap((action: AllCoursesRequested) => this.coursesService.findAllCourses()),
    map((courses: Course[]) => new AllCoursesLoaded({courses}))
  );
  @Effect()
  loadLessonsPage$ = this.actions$.pipe(
    ofType<LessonsPageRequested>(CourseActionTypes.LessonsPageRequested.toString()),
    mergeMap(({payload}) => this.coursesService.findLessons(payload.courseId, payload.page.pageIndex, payload.page.pageSize).pipe(
      catchError((err: any, caught: Observable<Lesson[]>) => {
        console.error('error ocurred');
        this.store.dispatch(new LessonsPageCancelled());
        throw new Error(`error ocurred ${err}`);
      })
    )),
    map((lessons: Lesson[]) => new LessonsPageLoaded({lessons}))
  );

  constructor(private actions$: Actions, private  coursesService: CoursesService, private  store: Store<AppState>) {

  }

}
