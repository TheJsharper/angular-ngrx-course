import {createFeatureSelector, createSelector, MemoizedSelector} from "@ngrx/store";
import {Course} from "./model/course";
import {CourseState} from "./course.reducers";

export const selectCoursesState: MemoizedSelector<any, CourseState> = createFeatureSelector<CourseState>("courses");

export const selectCourseById: (courseId: number) => MemoizedSelector<CourseState, Course> =
  (courseId: number) => createSelector(
    <any>selectCoursesState,
    (coursesState: CourseState) => coursesState.entities[courseId]
  );
