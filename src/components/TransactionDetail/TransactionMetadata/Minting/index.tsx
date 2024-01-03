import { Box, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { HeaderSearchIconComponent } from "src/commons/resources";
import { details } from "src/commons/routers";
import { formatAmount, getShortHash } from "src/commons/utils/helper";
import ScriptModal from "src/components/ScriptModal";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { Column } from "src/components/commons/Table";
import { Logo } from "src/pages/Token/styles";
import CustomIcon from "src/components/commons/CustomIcon";

import { Amount, AssetName, LogoEmpty, TableMinting } from "./styles";

interface MintingProps {
  data: Transaction["mints"] | null;
}

const Minting: React.FC<MintingProps> = ({ data }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const [selectedItem, setSelectedItem] = useState<string>("");

  const columns: Column<Required<Transaction>["mints"][number]>[] = [
    {
      title: t("glossary.assetName"),
      isHiddenBorder: true,
      key: "Assetname",
      minWidth: "40px",
      render: (r) => {
        return (
          <AssetName>
            <>
              {r?.metadata?.logo ? <Logo src={`${r?.metadata?.logo}`} alt="icon" /> : <LogoEmpty />}
              <Box
                component={Link}
                color={({ palette }) => `${palette.primary.main} !important`}
                to={details.token(r.assetId)}
              >
                {r.assetName ? (
                  r.assetName
                ) : (
                  <CustomTooltip title={r.assetId}>
                    <Box component={"span"}>{getShortHash(r.assetId)}</Box>
                  </CustomTooltip>
                )}
              </Box>
            </>
          </AssetName>
        );
      }
    },
    {
      title: t("glossary.amountedMinted"),
      isHiddenBorder: true,
      key: "Amount",
      minWidth: "40px",
      render: (r) => {
        return <Amount>{formatAmount(r.assetQuantity, r.metadata?.decimals)}</Amount>;
      }
    },
    {
      title: t("common.policyScript"),
      key: "Policy",
      minWidth: "40px",
      maxWidth: "120px",
      isHiddenBorder: true,
      render: (r) => {
        return (
          <Box
            onClick={() => {
              setOpen(true);
              setSelectedItem(r.policy || "");
            }}
          >
            <CustomIcon
              icon={HeaderSearchIconComponent}
              stroke={theme.palette.secondary.light}
              fill={theme.palette.secondary[0]}
              height={22}
            />
          </Box>
        );
      }
    }
  ];

  return (
    <Box
      border={({ palette, isDark }) => `1px solid ${isDark ? palette.secondary[700] : palette.primary[200]}`}
      borderRadius={2}
    >
      <TableMinting columns={columns} data={data || []} showPagination={false} />
      <ScriptModal open={open} policy={selectedItem || ""} onClose={() => setOpen(false)} />
    </Box>
  );
};

export default Minting;
