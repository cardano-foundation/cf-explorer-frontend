import { fireEvent, render, screen } from "src/test-utils";

import PopperStyled from ".";

const MockButton = <span>Contents</span>;

describe("Popover component", () => {
  it("should component render", () => {
    render(
      <PopperStyled
        content={MockButton}
        render={({ handleClick }: { handleClick: unknown }) => (
          <button onClick={handleClick as React.MouseEventHandler<HTMLButtonElement>}>Click</button>
        )}
        showCloseButton={true}
      />
    );
    expect(screen.getByRole("button", { name: /click/i })).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole("button", {
        name: /click/i
      })
    );
  });

  it("should component display more contents", () => {
    render(
      <PopperStyled
        content={MockButton}
        render={({ handleClick }: { handleClick: unknown }) => (
          <button onClick={handleClick as React.MouseEventHandler<HTMLButtonElement>}>Click</button>
        )}
        showCloseButton={true}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /click/i }));
    expect(screen.getByText(/contents/i)).toBeInTheDocument();
  });
});
