import { CoursePart } from '../types';

const Part = ({ part }: { part: CoursePart }) => {
  const exaustiveType = (type: never): never => {
    throw new Error(`Error ${type} is not valid`);
  };

  let element;
  switch (part.type) {
    case 'normal':
      element = (
        <p>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>{' '}
          <div>
            <i>{part.description}</i>
          </div>
        </p>
      );
      break;
    case 'submission':
      element = (
        <p>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>{' '}
          <div>
            <i>{part.description}</i>
          </div>{' '}
          {part.exerciseSubmissionLink}
        </p>
      );
      break;
    case 'groupProject':
      element = (
        <p>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          project exercises {part.groupProjectCount}
        </p>
      );
      break;
    case 'special':
      element = (
        <p>
          <h3>{part.name}</h3>{' '}
          <div>
            <i>{part.description}</i>
          </div>{' '}
          project exercises {part.exerciseCount}{' '}
          {part.requirements.map((req) => (
            <span key={req}>{req} </span>
          ))}
        </p>
      );
      break;
    default:
      exaustiveType(part);
      break;
  }
  return <>{element}</>;
};

export default Part;
