import "@testing-library/jest-dom/extend-expect";
import { screen } from "@testing-library/react";

import { render } from "src/test-utils";
import { SCRIPT_TYPE, ScriptTypeLabel } from "src/commons/utils/constants";

import ContractHeader from "./ContractHeader";

describe("ContractHeader", () => {
  it("should render header page", () => {
    render(<ContractHeader version={SCRIPT_TYPE.PLUTUSV1} />);
    expect(screen.getByText(ScriptTypeLabel[SCRIPT_TYPE.PLUTUSV1])).toBeInTheDocument();
    expect(screen.getByText(/Smart Contract Details/)).toBeInTheDocument();
  });
});
