import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import construct = Reflect.construct;
import {CourseActionTypes, CourseLoaded, CourseRequested} from "./course.actions";
import {mergeMap, map} from "rxjs/operators";
import {CoursesService} from "./services/courses.service";
import {Course} from "./model/course";

@Injectable()
export class CourseEffects {

  @Effect()
  loadCourse = this.actions$.pipe(
    ofType<CourseRequested>(CourseActionTypes.CourseRequested.toString()),
    mergeMap((action: CourseRequested) => this.courseService.findCourseById(action.payload.courseId)),
    map((course: Course) => new CourseLoaded({course: course}))
  );

  constructor(private actions$: Actions, private courseService: CoursesService) {
  }

}
