import {Action} from '@ngrx/store';
import {Course} from './model/course';
import {Update} from '@ngrx/entity';
import {Lesson} from './model/lesson';

export  enum CourseActionTypes {
  CourseRequested = '[View Course Page] Course Requested',
  CourseLoaded = '[Course API] Course Loaded',
  AllCoursesRequested = '[Course Home Page] All Courses Requested',
  AllCoursesLoaded = '[Courses API] All Courses Loaded',
  CourseSaved = '[Edit Course Dialog] Course Saved',

  LessonsPageRequested = '[Course Landing Page] Lessons Page Requested',
  LessonsPageLoaded = '[Courses API] Lessons Page Loaded',
  LessonsPageCancelled = '[Course API] Lessons Page Cancelled'

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

export interface PageQuery {
  pageIndex: number;
  pageSize: number;
}

export class LessonsPageRequested implements Action {
  readonly type: string = CourseActionTypes.LessonsPageRequested.toString();

  constructor(public payload: { courseId: number, page: PageQuery }) {
  }
}

export class LessonsPageLoaded implements Action {
  readonly type: string = CourseActionTypes.LessonsPageLoaded.toString();

  constructor(public  payload: { lessons: Lesson[] }) {
  }
}

export class LessonsPageCancelled implements Action {
  readonly type: string = CourseActionTypes.LessonsPageCancelled.toString();
}

export type CourseActions =
  CourseRequested
  | CourseLoaded
  | AllCoursesRequested
  | AllCoursesLoaded
  | CourseSaved
  | LessonsPageRequested
  | LessonsPageLoaded
  | LessonsPageCancelled;
