import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Course} from "../model/course";
import {Observable} from "rxjs";
import {CoursesService} from "./courses.service";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../reducers/index";
import {selectCourseById} from "../course.selectors";
import {filter, tap} from "rxjs/operators";
import {CourseRequested} from "../course.actions";


@Injectable()
export class CourseResolver implements Resolve<Course> {

  constructor(private coursesService: CoursesService, private store: Store<AppState>) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {

    const courseId = route.params["id"];
    const courses$: Observable<Course> = this.store.pipe(
      select(<any>selectCourseById(courseId)),
      tap((course: Course) => {
        if (!course)
          this.store.dispatch(new CourseRequested(courseId))
      }),
      filter((course: Course) => course != undefined)
    );
    return courses$;
    //return this.coursesService.findCourseById(route.params['id']);
  }

}

