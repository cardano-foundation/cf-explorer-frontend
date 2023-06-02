import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { render } from "src/test-utils";

import PopoverStyled from ".";

test("Render popover button", async () => {
  const buttonRef = {
    current: null
  };

  render(
    <PopoverStyled
      render={({ handleClick }) => (
        <button ref={buttonRef} onClick={() => buttonRef.current && handleClick(buttonRef.current)}>
          Button
        </button>
      )}
      content={<div>Content</div>}
    />
  );
  expect(screen.getByText(/Button/i)).toBeInTheDocument();
});

test("ATest click popover button", async () => {
  const buttonRef = {
    current: null
  };
  render(
    <PopoverStyled
      render={({ handleClick }) => (
        <button ref={buttonRef} onClick={() => buttonRef.current && handleClick(buttonRef.current)}>
          Button
        </button>
      )}
      content={<div>Content</div>}
    />
  );
  await userEvent.click(screen.getByText(/Button/i));
  expect(screen.getByText(/Content/i)).toBeInTheDocument();
});
