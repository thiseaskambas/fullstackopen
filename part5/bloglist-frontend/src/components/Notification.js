const Notification = ({ notification }) => {
  return <p className={notification.type}>{notification.message}</p>;
};

export default Notification;
