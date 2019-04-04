import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Lesson} from './model/lesson';
import {CourseActions, CourseActionTypes} from './course.actions';

export interface LessonsState extends EntityState<Lesson> {
  loading: boolean;
}

function sortByCourseAndSeqNo(l1: Lesson, l2: Lesson): number {
  const compare: number = l1.courseId - l2.courseId;
  if (compare === 0) {
    return l1.seqNo - l2.seqNo;
  } else {
    return compare;
  }
}

export const lessonAdapter: EntityAdapter<Lesson> = createEntityAdapter<Lesson>({
    sortComparer: sortByCourseAndSeqNo
  }
);

const initialLessonsState = lessonAdapter.getInitialState({
  loading: false
});

export function lessonsReducer(state: LessonsState = initialLessonsState, action: any): LessonsState {
  switch (action.type) {
    case CourseActionTypes.LessonsPageCancelled:
      return <LessonsState>{...state, loading: false};
    case  CourseActionTypes.LessonsPageRequested:
      return <LessonsState>{...state, loading: true};
    case  CourseActionTypes.LessonsPageLoaded:
      return lessonAdapter.addMany(action.payload.lessons, <LessonsState>{...state, loading: false});
    default: {
      return state;
    }
  }
}

export const {
  selectAll
} = lessonAdapter.getSelectors();

