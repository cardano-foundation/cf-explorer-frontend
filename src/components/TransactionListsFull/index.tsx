import { useHistory, useLocation } from "react-router-dom";
import { stringify } from "qs";
import { Box } from "@mui/material";
import { MouseEvent, useRef } from "react";
import { useTranslation } from "react-i18next";

import Card from "../commons/Card";
import Table, { Column } from "../commons/Table";
import { formatADAFull, formatDateTimeLocal, getPageInfo, getShortHash } from "../../commons/utils/helper";
import { details } from "../../commons/routers";
import { Label, StyledLink, StyledContainer } from "./styles";
import CustomTooltip from "../commons/CustomTooltip";
import useFetchList from "../../commons/hooks/useFetchList";
import ADAicon from "../commons/ADAIcon";

interface TransactionListFullProps {
  underline?: boolean;
  url: string;
  openDetail?: (_: MouseEvent<Element, globalThis.MouseEvent>, r: Transactions) => void;
  selected?: number | null;
  showTitle?: boolean;
}

const TransactionListFull: React.FC<TransactionListFullProps> = ({
  underline = false,
  url,
  openDetail,
  selected,
  showTitle = true
}) => {
  const { t } = useTranslation();
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);
  const fetchData = useFetchList<Transactions>(url, pageInfo);
  const mainRef = useRef(document.querySelector("#main"));

  const onClickRow = (_: MouseEvent<Element, globalThis.MouseEvent>, r: Transactions) => {
    if (openDetail) return openDetail(_, r);
    history.push(details.transaction(r.hash));
  };

  const columns: Column<Transactions>[] = [
    {
      title: t("glossary.txhash"),
      key: "hash",
      minWidth: 120,

      render: (r) => (
        <div>
          <CustomTooltip title={r.hash}>
            <StyledLink to={details.transaction(r.hash)}>{getShortHash(r.hash)}</StyledLink>
          </CustomTooltip>
        </div>
      )
    },
    {
      title: t("createdAt"),
      key: "createdat",
      minWidth: 120,
      render: (r) => <Box color={({ palette }) => palette.secondary.light}>{formatDateTimeLocal(r.time || "")}</Box>
    },
    {
      title: t("glossary.address"),
      key: "address",
      minWidth: 120,
      render(r) {
        return (
          <div>
            <Box display={"flex"}>
              <Label> {t("glossary.input")}: </Label>
              <div>
                {r.addressesInput.slice(0, 1).map((tx, key) => {
                  return (
                    <CustomTooltip key={key} title={tx}>
                      <StyledLink to={details.address(tx)} key={key}>
                        <Box ml={1}>{getShortHash(tx)}</Box>
                      </StyledLink>
                    </CustomTooltip>
                  );
                })}
                {r.addressesInput.length > 1 && (
                  <StyledLink to={details.transaction(r.hash)}>
                    <Box ml={1}>...</Box>
                  </StyledLink>
                )}
              </div>
            </Box>
            <Box display={"flex"} mt={1}>
              <Label>{t("glossary.output")}: </Label>
              <div>
                {r.addressesOutput.slice(0, 1).map((tx, key) => {
                  return (
                    <CustomTooltip key={key} title={tx}>
                      <StyledLink to={details.address(tx)} key={key}>
                        <Box ml={1}>{getShortHash(tx)}</Box>
                      </StyledLink>
                    </CustomTooltip>
                  );
                })}
                {r.addressesOutput.length > 1 && (
                  <StyledLink to={details.transaction(r.hash)}>
                    <Box ml={1}>...</Box>
                  </StyledLink>
                )}
              </div>
            </Box>
          </div>
        );
      }
    },
    {
      title: t("common.fees"),
      key: "fee",
      minWidth: 120,
      render: (r) => (
        <Box display="inline-flex" alignItems="center">
          <Box mr={1}>{formatADAFull(r.fee)}</Box>
          <ADAicon />
        </Box>
      )
    },
    {
      title: t("glossary.outputInAda"),
      minWidth: 120,
      key: "ouput",
      render: (r) => (
        <Box display="inline-flex" alignItems="center">
          <Box mr={1}>{formatADAFull(r.totalOutput)}</Box>
          <ADAicon />
        </Box>
      )
    }
  ];

  return (
    <StyledContainer>
      <Card title={showTitle ? t("head.page.transactions") : ""} underline={underline}>
        <Table
          {...fetchData}
          columns={columns}
          total={{ count: fetchData.total, title: t("common.totalTxs") }}
          pagination={{
            ...pageInfo,
            total: fetchData.total,
            onChange: (page, size) => {
              history.replace({ search: stringify({ page, size }) });
              mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          onClickRow={onClickRow}
          rowKey="hash"
          selected={selected}
          className="transactions-table"
        />
      </Card>
    </StyledContainer>
  );
};

export default TransactionListFull;
