import { CoursePart } from '../types';

const Total = ({ courseParts }: { courseParts: Array<CoursePart> }) => {
  return (
    <p>Number of exercises {courseParts.reduce((acc, curr) => acc + curr.exerciseCount, 0)}</p>
  );
};

export default Total;
