interface Story {
  title: string;
  resource_href: string;
  thumbnail_image: string;
  meta_image: string;
  news_item_content: {
    date: string;
    body: string;
    author: string;
    default_content: string;
  };
}

type StoryDetail = Story & {
  slotLeaded: string;
  transactionFees: string;
  totalOutput: string;
};

interface Articles {
  articles: Story[];
  limit: number;
  offset: number;
  total: number;
}
