import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { fireEvent, render, screen } from "src/test-utils";
import { getShortWallet } from "src/commons/utils/helper";
import { details } from "src/commons/routers";

import PoolCertificate from ".";

const mockProps: TPoolCertificated = {
  cost: 100,
  margin: 0.05,
  metadataHash: "metadata-hash",
  metadataUrl: "https://example.com/metadata",
  pledge: 1000,
  poolId: "pool-id",
  poolOwners: ["owner-1", "owner-2"],
  relays: [
    {
      dnsName: "relay-dns",
      dnsSrvName: "relay-dns-srv",
      ipv4: "relay-ipv4",
      ipv6: "relay-ipv6",
      port: 1234
    }
  ],
  rewardAccount: "reward-account",
  type: "POOL_REGISTRATION",
  vrfKey: "vrf-key",
  epoch: 1
};
describe("PoolCertificate component", () => {
  it("should component render", () => {
    render(<PoolCertificate data={[mockProps]} />);
    expect(screen.getByText(/pool registrations/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: getShortWallet(mockProps.poolId) })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: getShortWallet(mockProps.poolOwners[0]) })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: getShortWallet(mockProps.poolOwners[1]) })).toBeInTheDocument();
  });

  it("should user goto detail page", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <PoolCertificate data={[mockProps]} />
      </Router>
    );
    fireEvent.click(screen.getByRole("link", { name: getShortWallet(mockProps.poolId) }));
    expect(history.location.pathname).toBe(details.delegation(mockProps.poolId));
    fireEvent.click(screen.getByRole("link", { name: getShortWallet(mockProps.poolOwners[0]) }));
    expect(history.location.pathname).toBe(details.stake(mockProps.poolOwners[0]));
    fireEvent.click(screen.getByRole("link", { name: getShortWallet(mockProps.poolOwners[1]) }));
    expect(history.location.pathname).toBe(details.stake(mockProps.poolOwners[1]));
  });
});
