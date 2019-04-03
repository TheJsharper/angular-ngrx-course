import {Action} from "@ngrx/store";
import {Course} from "./model/course";

export enum CourseActionTypes {
  CourseRequested = "[View Course Page] Course Request",
  CourseLoaded = "[Course API] Course Loaded",
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
export type CourseActions = CourseRequested | CourseLoaded;
//export  type CourseLoadedAction = CourseLoaded;
