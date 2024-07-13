import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  

  if (notification.content === "") {
    return <div></div>;
  } else {
    return <div className="p-4 m-1 border-2 border-black rounded-md text-center  text-3xl text-black">{notification.content}</div>;
  }
};

export default Notification;
