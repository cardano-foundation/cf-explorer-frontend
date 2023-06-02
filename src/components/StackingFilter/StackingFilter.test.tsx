import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { render } from "src/test-utils";

import StackingFilter from ".";

test("Render StackingFilter", async () => {
  const onFilterValueChange = jest.fn();
  render(
    <StackingFilter
      onFilterValueChange={onFilterValueChange}
      filterValue={{
        fromDate: undefined,
        sort: undefined,
        toDate: undefined,
        txHash: undefined
      }}
    />
  );
  await userEvent.click(screen.getByText("Filter"));
  await userEvent.click(screen.getByText(/Latest - First/i));
  expect(onFilterValueChange).toHaveBeenCalled();
});
