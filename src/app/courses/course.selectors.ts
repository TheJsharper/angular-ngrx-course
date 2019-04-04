import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';
import {CoursesState} from './course.reducers';
import {Course} from './model/course';
import {selectAll} from './course.reducers';
import * as fromLessons from './lessons.reducers';
import {PageQuery} from './course.actions';
import {LessonsState} from './lessons.reducers';
import {Lesson} from './model/lesson';

export const selectCoursesState = createFeatureSelector<CoursesState>('courses');
export const selectLessonsState: MemoizedSelector<object, LessonsState> = createFeatureSelector<LessonsState>('lessons');

export const selectCourseById: (courseId: number) => MemoizedSelector<CoursesState, Course> = (courseId: number) => createSelector(
  <any>selectCoursesState,
  (coursesState: CoursesState) => coursesState.entities[courseId],
);

export const selectAllCourses: MemoizedSelector<CoursesState, Course[]> = createSelector(
  <any>selectCoursesState,
  selectAll
);
export const selectBeginnerCourses: MemoizedSelector<CoursesState, Course[]> = createSelector(
  <any>selectAllCourses,
  (courses: Course[]) => courses.filter((course: Course) => course.category === 'BEGINNER')
);

export const selectAdvancedCourses: MemoizedSelector<CoursesState, Course[]> = createSelector(
  <any>selectAllCourses,
  (courses: Course[]) => courses.filter((course: Course) => course.category === 'ADVANCED')
);

export const selectPromoTotal: MemoizedSelector<CoursesState, number> = createSelector(
  <any>selectAllCourses,
  (courses: Course[]) => courses.filter((course: Course) => course.promo).length
);
export const allCoursesLoaded: MemoizedSelector<CoursesState, boolean> = createSelector(
  <any>selectCoursesState,
  (coursesState: CoursesState) => coursesState.allCourseLoaded,
);
export const selectAllLessons: MemoizedSelector<LessonsState, Lesson[]> = createSelector(
  <any>selectLessonsState,
  fromLessons.selectAll,
);

export const selectLessonPage: (courseId: number, page: PageQuery) => MemoizedSelector<LessonsState, Lesson[]> = (courseId: number, page: PageQuery) => createSelector(
  <any>selectAllLessons,
  (allLessons: Lesson[]) => {
    const start = page.pageIndex * page.pageSize,
      end = start + page.pageSize;
    return allLessons.filter((lesson: Lesson) => lesson.courseId === courseId).slice(start, end);
  }
);

export const selectLessonsLoading: MemoizedSelector<LessonsState, boolean> = createSelector(
  <any>selectLessonsState,
  (lessonState: LessonsState) => lessonState.loading
);
