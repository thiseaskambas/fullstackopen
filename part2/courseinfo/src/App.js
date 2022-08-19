import Course from "./components/Course";
const courses = [
  {
    name: "Half Stack application development",
    id: 1,
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "Redux",
        exercises: 11,
        id: 4,
      },
    ],
  },
  {
    name: "Node.js",
    id: 2,
    parts: [
      {
        name: "Routing",
        exercises: 3,
        id: 1,
      },
      {
        name: "Middlewares",
        exercises: 7,
        id: 2,
      },
    ],
  },
];

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Total = (props) => (
  <p>
    <b>Number of exercises {props.total}</b>
  </p>
);

const Content = ({ course }) => {
  return (
    <>
      {course.parts.map((part) => (
        <Course key={part.id} name={part.name} exercises={part.exercises} />
      ))}
      <Total
        total={course.parts.reduce((prev, cur) => prev + cur.exercises, 0)}
      />
    </>
  );
};

const App = () => {
  return (
    <>
      {courses.map((course) => (
        <div key={course.id}>
          <Header course={course} />
          <Content course={course} />
        </div>
      ))}
    </>
  );
};

export default App;
