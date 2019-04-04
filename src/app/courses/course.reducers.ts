import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {Course} from "./model/course";
import {CourseActions, CourseActionTypes} from "./course.actions";

export interface CoursesState extends EntityState<Course> {
    allCourseLoaded:boolean;
}

export const courseAdapter: EntityAdapter<Course> = createEntityAdapter<Course>();

export const initialCoursesState: CoursesState = courseAdapter.getInitialState({allCourseLoaded:false});

export function coursesReducer(state: CoursesState = initialCoursesState, action/*:CourseActions*/): CoursesState {
  switch (action.type) {
    case  CourseActionTypes.CourseLoaded:
      return courseAdapter.addOne(action.payload.course, state);
    case CourseActionTypes.AllCoursesLoaded:
      const currState:CoursesState = <CoursesState>{...state, allCourseLoaded: true};
      return courseAdapter.addAll(action.payload.courses, currState);
    case CourseActionTypes.CourseSaved:
      return courseAdapter.updateOne(action.payload.course, state);
    default: {
      return state;
    }
  }
}

export const {
  selectAll
} = courseAdapter.getSelectors();
