import {createFeatureSelector, createSelector, MemoizedSelector} from "@ngrx/store";
import {CoursesState} from "./course.reducers";
import {Course} from "./model/course";
import {selectAll} from './course.reducers'

export const selectCoursesState = createFeatureSelector<CoursesState>("courses");

export const selectCourseById: (courseId: number) => MemoizedSelector<CoursesState, Course> = (courseId: number) => createSelector(
  <any>selectCoursesState,
  (coursesState: CoursesState) => coursesState.entities[courseId],
);

export  const selectAllCourses:MemoizedSelector<CoursesState, Course[]> = createSelector(
  <any>selectCoursesState,
  selectAll
);
export const selectBeginnerCourses:MemoizedSelector<CoursesState, Course[]> = createSelector(
  <any>selectAllCourses,
  (courses:Course[]) => courses.filter((course:Course)=> course.category ==="BEGINNER")
);

export const selectAdvancedCourses:MemoizedSelector<CoursesState, Course[]> = createSelector(
  <any>selectAllCourses,
  (courses:Course[]) => courses.filter((course:Course)=> course.category ==="ADVANCED")
);

export const selectPromoTotal:MemoizedSelector<CoursesState, number> = createSelector(
  <any>selectAllCourses,
  (courses:Course[]) => courses.filter((course:Course)=> course.promo).length
);
export const allCoursesLoaded: MemoizedSelector<CoursesState, boolean> = createSelector(
  <any>selectCoursesState,
  (coursesState: CoursesState) => coursesState.allCourseLoaded,
);
