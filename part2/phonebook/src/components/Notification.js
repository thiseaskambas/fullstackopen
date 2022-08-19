const Notification = ({ message }) => {
  if (message.type === null) {
    return null;
  }

  return <div className={message.type}>{message.text}</div>;
};

export default Notification;
