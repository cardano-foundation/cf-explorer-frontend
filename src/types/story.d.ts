interface Story {
  title: string;
  published_on: string;
  entity: string;
  blurb: string;
  resource_href: string;
  featured: boolean;
  main_image: string;
  main_image_alt: string;
}

type StoryDetail = Story & {
  slotLeaded: string;
  transactionFees: string;
  totalOutput: string;
};
