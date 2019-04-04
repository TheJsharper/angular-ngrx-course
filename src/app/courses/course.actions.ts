import {Action} from "@ngrx/store";
import {Course} from "./model/course";
import {Update} from "@ngrx/entity";

export  enum CourseActionTypes {
  CourseRequested = "[View Course Page] Course Requested",
  CourseLoaded = "[Course API] Course Loaded",
  AllCoursesRequested = "[Course Home Page] All Courses Requested",
  AllCoursesLoaded = "[Courses API] All Courses Loaded",
  CourseSaved="[Edit Course Dialog] Course Saved"

}

export class CourseRequested implements Action {
  readonly type: string = CourseActionTypes.CourseRequested.toString();

  constructor(public payload: { courseId: number }) {

  }
}

export class CourseLoaded implements Action {
  readonly type: string = CourseActionTypes.CourseLoaded.toString();

  constructor(public payload: { course: Course }) {

  }
}

export class AllCoursesRequested implements Action {
  readonly type: string = CourseActionTypes.AllCoursesRequested.toString();
}

export class AllCoursesLoaded implements Action {
  readonly type: string = CourseActionTypes.AllCoursesLoaded.toString();

  constructor(public payload: { courses: Course[] }) {

  }
}

export class CourseSaved implements Action {
  readonly type: string = CourseActionTypes.CourseSaved.toString();

  constructor(public payload: { course: Update<Course> }) {

  }
}

export type CourseActions = CourseRequested | CourseLoaded | AllCoursesRequested | AllCoursesLoaded | CourseSaved;
