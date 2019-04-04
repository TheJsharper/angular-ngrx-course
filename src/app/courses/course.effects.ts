import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {
  AllCoursesLoaded, AllCoursesRequested, CourseActionTypes, CourseLoaded,
  CourseRequested
} from "./course.actions";
import {mergeMap, map, withLatestFrom, filter} from "rxjs/operators";
import {CoursesService} from "./services/courses.service";
import {Course} from "./model/course";
import {select, Store} from "@ngrx/store";
import {AppState} from "../reducers/index";
import {allCoursesLoaded} from "./course.selectors";

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
    withLatestFrom(this.store.pipe(select(allCoursesLoaded))),
    filter(([action, allCoursesLoaded])=> !allCoursesLoaded),
    mergeMap((action: AllCoursesRequested) => this.coursesService.findAllCourses()),
    map((courses: Course[]) => new AllCoursesLoaded({courses}))
  );

  constructor(private actions$: Actions, private  coursesService: CoursesService, private  store: Store<AppState>) {

  }

}
