const Notification = ({ notification }) => {
  return <p className={notification.type}>{notification.content}</p>;
};

export default Notification;
