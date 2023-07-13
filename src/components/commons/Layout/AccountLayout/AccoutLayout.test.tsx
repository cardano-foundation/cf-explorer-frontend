import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import { fireEvent, render, screen, waitFor } from "src/test-utils";

import AccountLayout, { router } from ".";

const MockComponent = () => <span>Contents</span>;

describe("AccountLayout component", () => {
  it("should component render", () => {
    render(
      <AccountLayout>
        <MockComponent />
      </AccountLayout>
    );
    expect(screen.getByRole("heading", { name: /account overview/i })).toBeInTheDocument();
    expect(screen.getByTestId("PersonIcon")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /editava/i })).toBeInTheDocument();
    expect(screen.getByText(/contents/i)).toBeInTheDocument();
  });

  it("should component upload a image", async () => {
    const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
    render(
      <AccountLayout>
        <MockComponent />
      </AccountLayout>
    );
    const uploader = screen.getByTestId("upload-input") as HTMLInputElement;
    await waitFor(() => userEvent.upload(uploader, file));
    expect(uploader).toBeInTheDocument();
    expect(uploader.files?.length).toBeGreaterThan(0);
    expect(uploader.files?.[0].type).toBe("image/png");
    expect(uploader.files?.[0].name).toBe("chucknorris.png");
  });

  it("should the router works well", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <AccountLayout>
          <MockComponent />
        </AccountLayout>
      </Router>
    );
    const myProfileLink = screen.getByRole("link", { name: /my profile/i });
    fireEvent.click(myProfileLink);
    expect(history.location.pathname).toBe(router[0].to);
    const bookmarkLink = screen.getByRole("link", { name: /bookmark/i });
    fireEvent.click(bookmarkLink);
    expect(history.location.pathname).toBe(router[1].to);
    const provateNotesLink = screen.getByRole("link", { name: /private notes/i });
    fireEvent.click(provateNotesLink);
    expect(history.location.pathname).toBe(router[2].to);
  });
});
