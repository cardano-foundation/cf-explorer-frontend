import { useState, useEffect } from "react";
import { FetchData } from "../Services";

const TestingAPICalls = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    FetchData()
      .then((res: any) => res.json())
      .then((data: any) => {
        setData(data);
      });
  }, []);

  return (
    <div>
      {data.map((item: any) => (
        <div key={item}>{item.name}</div>
      ))}
    </div>
  );
};

export default TestingAPICalls;
