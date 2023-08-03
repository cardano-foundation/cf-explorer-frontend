import { cleanup, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { render } from "src/test-utils";
import useFetch from "src/commons/hooks/useFetch";
import { formatDateTime } from "src/commons/utils/helper";

import LatestStories from ".";

jest.mock("src/commons/hooks/useFetch");

const mockItem: Story = {
  title: "Cardano Foundation Launches Inaugural Annual Report",
  resource_href: "https://cardanofoundation.org/en/news/cardano-foundation-launches-inaugural-annual-report/",
  thumbnail_image: "https://ucarecdn.com/4e580ddd-e051-472e-8e9d-f70ba3265d92/",
  meta_image: "https://ucarecdn.com/4e580ddd-e051-472e-8e9d-f70ba3265d92/",
  banner_image: "https://ucarecdn.com/4e580ddd-e051-472e-8e9d-f70ba3265d92/",
  news_item_content: {
    date: "2023-04-18T11:35:58-07:00",
    body: "body",
    author:
      "https://ucarecdn.com/6b3ced46-5e70-43fd-9272-bbb3e1bb9dea/-/crop/1242x772/0,45/-/preview/|Renagh Mooney~~~Global Communications Director",
    default_content:
      "The lacrosse jerseys feature a near-field communication (NFC) Epoch branded patch with a digital NFT version authenticated on the Cardano blockchain."
  }
};

describe("LatestStories", () => {
  beforeEach(() => {
    const mockUseFetch = useFetch as jest.Mock;
    mockUseFetch.mockReturnValue({ data: { articles: [mockItem] }, initialized: true });
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
    expect(screen.getByText(mockItem.title)).toBeInTheDocument();
    expect(screen.getByText(formatDateTime(mockItem.news_item_content.date))).toBeInTheDocument();
  });
});
