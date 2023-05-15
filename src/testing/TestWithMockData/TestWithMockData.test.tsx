import TestWithMockData from ".";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockData = [
  {
    id: 1,
    first_name: "Fletcher",
    last_name: "McVanamy",
    email: "mmcvanamy0@e-recht24.de",
    age: 30,
  },
  {
    id: 2,
    first_name: "Clarice",
    last_name: "Harrild",
    email: "charrild1@dion.ne.jp",
    age: 35,
  },
];

test("List renders successfully", () => {
  render(<TestWithMockData data={mockData} />);
  expect(screen.getByText(/fletcher/i)).toBeInTheDocument();
});

test("Email link click handler called", async () => {
  const mockHandleClick = jest.fn();
  render(<TestWithMockData data={mockData} displayUnorderedList={true} handleClick={mockHandleClick} />);
  await userEvent.click(screen.getByText(/mmcvanamy0@e-recht24.de/i));
  expect(mockHandleClick).toHaveBeenCalled();
});
