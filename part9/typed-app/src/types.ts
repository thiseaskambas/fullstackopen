interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface IncludesDescription extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends IncludesDescription {
  type: 'normal';
}

interface CourseSubmissionPart extends IncludesDescription {
  type: 'submission';
  exerciseSubmissionLink: string;
}

interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject';
  groupProjectCount: number;
}

interface BackendCourse extends IncludesDescription {
  type: 'special';
  requirements: Array<string>;
}

export type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | BackendCourse;
