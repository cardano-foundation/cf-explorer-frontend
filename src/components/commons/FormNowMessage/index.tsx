import moment from "moment";
import { useEffect, useState } from "react";

type Props = {
  time: moment.MomentInput;
};

const FormNowMessage = ({ time }: Props) => {
  const [message, setMessage] = useState(`Last updated ${moment(time).fromNow()}`);

  useEffect(() => {
    if (time) {
      const interval = setInterval(() => {
        setMessage(`Last updated ${moment(time).fromNow()}`);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [time]);

  return <>{message}</>;
};

export default FormNowMessage;
