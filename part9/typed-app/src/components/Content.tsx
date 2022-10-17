import Part from './Part';
import { CoursePart } from '../types';

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map((part) => (
        <Part part={part} key={part.name} />
      ))}
    </div>
  );
};

export default Content;
