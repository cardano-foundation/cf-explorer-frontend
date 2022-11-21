interface Story {
  id: string;
  title: string;
  image: string;
  author: string;
  createdDate: string; 
}

type StoryDetail = Story & {
  slotLeaded: string;
  transactionFees: string;
  totalOutput: string;
};
