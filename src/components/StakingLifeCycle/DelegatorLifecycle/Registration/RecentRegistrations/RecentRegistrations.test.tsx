import { render, screen, waitFor } from "@testing-library/react";
import RecentRegistrations from ".";
import Router from 'react-router'

const txHash = "f0cc0767ea4cf06ce45a85db8f17f930576af1b06f327b8d9d5d25c17f962166";
const time = new Date().toString();

const fakeUserResponse: RegistrationItem[] = [
  {
    txHash,
    deposit: 1,
    fee: 1,
    time,
  },
];

test("should render RecentRegistrations call mock api", async () => {
  const onSelect = jest.fn();
  jest.spyOn(Router, 'useParams').mockReturnValue({stakeId: '1'})
 
  render(<RecentRegistrations onSelect={onSelect} />);
  const elm = screen.getByTestId('recent-registration')
  expect(elm).toHaveTextContent('Recent Registrations')
  expect(elm).toHaveTextContent('Showing')
});
