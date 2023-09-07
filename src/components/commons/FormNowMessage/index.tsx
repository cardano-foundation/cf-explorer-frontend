import moment from "moment";
import { useEffect, useState } from "react";

type Props = {
  time?: moment.MomentInput;
};

const FormNowMessage = ({ time }: Props) => {
  const [message, setMessage] = useState(time ? `Last updated ${moment(time).fromNow()}` : "");

  useEffect(() => {
    if (time) {
      setMessage(`Last updated ${moment(time).fromNow()}`);
      const interval = setInterval(() => {
        setMessage(`Last updated ${moment(time).fromNow()}`);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [time]);

  return <>{message}</>;
};

export default FormNowMessage;
