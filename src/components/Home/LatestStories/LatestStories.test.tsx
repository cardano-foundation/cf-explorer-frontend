import { cleanup, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { render } from "src/test-utils";
import useFetch from "src/commons/hooks/useFetch";
import { formatDateTime } from "src/commons/utils/helper";

import LatestStories from ".";

jest.mock("src/commons/hooks/useFetch");

const mockItem: Story = {
  blurb: "The Cardano Foundation launched its inaugural Annual Report. The report",
  entity: "Cardano Foundation",
  featured: true,
  main_image: "https://ucarecdn.com/4e580ddd-e051-472e-8e9d-f70ba3265d92/",
  main_image_alt: "Cardano Foundation Annual Report 2022",
  published_on: "2023-04-18T11:35:58-07:00",
  resource_href: "https://cardanofoundation.org/en/news/cardano-foundation-launches-inaugural-annual-report/",
  title: "Cardano Foundation Launches Inaugural Annual Report"
};

describe("LatestStories", () => {
  beforeEach(() => {
    const mockUseFetch = useFetch as jest.Mock;
    mockUseFetch.mockReturnValue({ data: [mockItem], initialized: true });
  });

  afterEach(() => {
    cleanup();
  });

  it("renders LatestStories", async () => {
    render(<LatestStories />);
    expect(screen.getByText("Latest Stories")).toBeInTheDocument();
  });

  it("renders data in the list LatestStories", async () => {
    render(<LatestStories />);
    expect(screen.getByText(mockItem.entity)).toBeInTheDocument();
    expect(screen.getByText(mockItem.title)).toBeInTheDocument();
    expect(screen.getByAltText(mockItem.main_image_alt)).toBeInTheDocument();
    expect(screen.getByText(formatDateTime(mockItem.published_on))).toBeInTheDocument();
  });
});
