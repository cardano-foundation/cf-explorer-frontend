import * as services from "../Services";

import { render, screen, waitFor } from "@testing-library/react";

import TestingAPICalls from ".";

test("setup api call mock api", async () => {
  const fakeUserResponse = [
    {
      name: "kunal"
    }
  ];

  const mockFetchData = jest.spyOn(services, "FetchData").mockImplementation(async () => {
    return Promise.resolve({
      json: () => Promise.resolve(fakeUserResponse)
    });
  });

  render(<TestingAPICalls />);
  expect(mockFetchData).toHaveBeenCalled();
  await waitFor(() => {
    expect(screen.getByText(/kunal/i)).toBeInTheDocument();
  });
});
