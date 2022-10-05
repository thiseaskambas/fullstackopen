import { useState } from 'react';

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);
  const displayWhenVisible = { display: visible ? '' : 'none' };
  const displayWhenHidden = { display: visible ? 'none' : true };
  return (
    <>
      <div id={props.id} style={displayWhenHidden}>
        <button onClick={() => setVisible(true)}>{props.label}</button>
      </div>
      <div style={displayWhenVisible}>
        {props.children}
        <button onClick={() => setVisible(false)}>Cancel</button>
      </div>
    </>
  );
};
export default Togglable;
