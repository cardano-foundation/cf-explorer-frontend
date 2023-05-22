import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Filter, { Option } from ".";

export const filterOtions: Option[] = [
  {
    value: "id,desc",
    icon: <i />,
    label: "Latest - First"
  }
];

test("Render filter", async () => {
  render(<Filter options={filterOtions} />);
  const element = screen.getByText("Filter");
  expect(element).toBeInTheDocument();
});

test("Test click filter button", async () => {
  render(<Filter options={filterOtions} />);
  await userEvent.click(screen.getByText("Filter"));
  const element = screen.getByText(/Latest - First/i);
  expect(element).toBeInTheDocument();
});

test("Test click filter option", async () => {
  const onOptionChange = jest.fn();
  render(<Filter onOptionChange={onOptionChange} options={filterOtions} />);
  await userEvent.click(screen.getByText("Filter"));
  await userEvent.click(screen.getByText(/Latest - First/i));
  expect(onOptionChange).toHaveBeenCalled();
});
