import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import { UserDataType } from "src/types/user";
import { routers } from "src/commons/routers";
import { render } from "src/test-utils";

import ConnectedProfileOptionNormalLogin from ".";

const userData: UserDataType = {
  avatar: "",
  email: "useremail@email.com",
  wallet: "",
  address: "",
  username: "username",
  sizeBookmark: 0,
  sizeNote: 0,
  lastLogin: "",
  loginType: ""
};

test("Render username", async () => {
  render(<ConnectedProfileOptionNormalLogin userData={userData} />);
  const element = screen.getByText(/username/i);
  expect(element).toBeInTheDocument();
});

test("normal click username button", async () => {
  render(<ConnectedProfileOptionNormalLogin userData={userData} />);
  await userEvent.click(screen.getByText(/username/i));
  expect(screen.getByText(/Account/i)).toBeInTheDocument();
});

test("login click user profile button", async () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <ConnectedProfileOptionNormalLogin userData={userData} />
    </Router>
  );
  await userEvent.click(screen.getByText(/username/i));
  const aboutItem = screen.getByText(/Account/i);
  await userEvent.click(aboutItem);
  expect(history.length).toBe(2);
  expect(history.location.pathname).toBe(routers.ACCOUNT);
});
