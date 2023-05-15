import { useState, useEffect } from "react";

const TestingStateChange = () => {
  const [loaded, setLoaded] = useState(false);
  const [toggleTextVisible, setToggleTextVisible] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    <div>
      <div>{loaded && <h3> Page Loaded </h3>}</div>
      <div>
        {toggleTextVisible && <p> Text visible </p>}

        <button
          onClick={() => {
            setToggleTextVisible(!toggleTextVisible);
          }}
        >
          Toggle text
        </button>
      </div>
    </div>
  );
};

export default TestingStateChange;
