import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {Course} from "./model/course";
import {CourseActions, CourseActionTypes} from "./course.actions";

export interface CourseState extends EntityState<Course> {

}

export const courseAdapter: EntityAdapter<Course> = createEntityAdapter<Course>();

export const initialCoursesState: CourseState = courseAdapter.getInitialState();


export function CoursesReducer(state: CourseState = initialCoursesState, action: any): CourseState {
  switch (action.type) {
    case CourseActionTypes.CourseLoaded:
      courseAdapter.addOne(action.payload.course, state);

    default: {
      return state;
    }
  }
}
