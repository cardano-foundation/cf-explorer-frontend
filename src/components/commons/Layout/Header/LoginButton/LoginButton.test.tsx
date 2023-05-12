import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import LoginButton from ".";
import { routers } from "../../../../../commons/routers";

beforeEach(() => {
  cleanup()
})
test("Render button", async () => {
  render(<LoginButton />);
  const element = screen.getByText('Sign In');
  expect(element).toBeInTheDocument();
});

test("login click login button", async () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <LoginButton />
    </Router>
  );
  const aboutItem = screen.getByText("SiTest click filter optiongn In");
  await userEvent.click(aboutItem);
  expect(history.length).toBe(2);
  expect(history.location.pathname).toBe(routers.SIGN_IN);
});
