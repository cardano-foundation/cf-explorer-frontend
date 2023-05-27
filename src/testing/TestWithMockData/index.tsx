/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
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
