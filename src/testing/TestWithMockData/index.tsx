/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const TestWithMockData = ({ data, handleClick }: any) => {
  return (
    <div>
      <ul>
        {data.map((item: any) => (
          <li key={item.id}>
            {item.id}
            {item.first_name},{item.last_name},
            <a
              onClick={() => {
                console.log("email link clicked");
                handleClick();
              }}
            >
              {item.email}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestWithMockData;
