import { useState } from "react";
import { Box } from "@mui/system";
import { Container, Modal, TextareaAutosize, Theme, styled, useTheme, alpha } from "@mui/material";

import * as icons from "src/commons/resources";
import CustomIcon from "src/components/commons/CustomIcon";

const StyledContainer = styled(Container)`
  padding: 20px 0 40px;
  background: ${({ theme }) => alpha(theme.palette.grey[300], 0.1)};
`;

const StyledImage = styled("img")`
  width: auto;
  height: auto;
  max-width: 60px;
  max-height: 60px;
  cursor: pointer;
`;

const Group = styled(Box)`
  padding: 20px 20px 50px;
  border-bottom: 2px solid ${({ theme }) => theme.palette.border.primary};
  text-align: left;
`;

const Title = styled("h3")`
  border-bottom: 1px solid ${({ theme }) => theme.palette.border.primary};
  width: max-content;
`;
const IconList = styled(Box)`
  display: flex;
  flex-wrap: wrap;
`;

const IconBox = styled(Box)`
  display: flex;
  width: 60px;
  height: 60px;
  background: white;
  justify-content: center;
  align-items: center;
  margin: 5px;
  box-sizing: border-box;
`;

interface StyleItem {
  width: number;
  color?: "primary" | "secondary" | string;
  fill?: "currentColor" | "primary" | "secondary" | string;
  stroke?: "currentColor" | "primary" | "secondary" | string;
}

const styleList: StyleItem[] = [
  { width: 20 },
  { width: 40 },
  { width: 60 },
  { width: 60, fill: "currentColor" },
  { width: 60, color: "primary", fill: "currentColor" },
  { width: 60, color: "secondary", fill: "currentColor" },
  { width: 60, fill: "secondary" },
  { width: 60, fill: "primary" },
  { width: 60, fill: "red" },
  { width: 60, color: "secondary", stroke: "currentColor" },
  { width: 60, stroke: "currentColor" },
  { width: 60, stroke: "secondary" },
  { width: 60, stroke: "primary" },
  { width: 60, stroke: "red" }
];

const Item = ({ name, Icon }: { name: string; Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>> }) => {
  const [open, setOpen] = useState(false);
  const [props, setProps] = useState<StyleItem>({
    width: 60
  });
  const theme = useTheme();
  const importTheme = `const theme = useTheme();\n`;

  let stringify = `<CustomIcon icon={${name}} width={${props.width}}`;
  switch (props.fill) {
    case "primary":
      if (!stringify.includes(importTheme)) stringify = importTheme + stringify;
      stringify += ` fill={theme.palette.primary.main}`;
      break;
    case "secondary":
      if (!stringify.includes(importTheme)) stringify = importTheme + stringify;
      stringify += ` fill={theme.palette.secondary.main}`;
      break;
    case undefined:
      break;
    default:
      stringify += ` fill="${props.fill}"`;
  }
  switch (props.stroke) {
    case "primary":
      if (!stringify.includes(importTheme)) stringify = importTheme + stringify;
      stringify += ` stroke={theme.palette.primary.main}`;
      break;
    case "secondary":
      if (!stringify.includes(importTheme)) stringify = importTheme + stringify;
      stringify += ` stroke={theme.palette.secondary.main}`;
      break;
    case undefined:
      break;
    default:
      stringify += ` stroke="${props.stroke}"`;
  }
  switch (props.color) {
    case "primary":
      stringify += ` color={theme=>theme.palette.primary.main}`;
      break;
    case "secondary":
      stringify += ` color={theme=>theme.palette.secondary.main}`;
      break;
    case undefined:
      break;
    default:
      stringify += `color="${props.color}"`;
  }
  stringify += ` />`;

  return (
    <IconBox>
      <CustomIcon icon={Icon} title={name} width={60} onClick={() => setOpen(!open)} style={{ cursor: "pointer" }} />
      <Modal
        open={open}
        onClose={() => setOpen(!open)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box>
          <Box width={700} sx={{ background: theme.palette.common.white, padding: "30px" }}>
            <TextareaAutosize
              value={stringify}
              style={{
                width: "calc(100% - 30px)",
                marginBottom: "20px",
                fontSize: 14,
                padding: 15,
                resize: "vertical"
              }}
              minRows={3}
            />
            <Box
              display={"flex"}
              flexWrap={"wrap"}
              gap={"20px"}
              sx={{ background: theme.palette.common.white, padding: "30px" }}
            >
              {styleList.map((item, idx) => {
                let color: string | ((theme: Theme) => string) | undefined = item.color;
                switch (item.color) {
                  case "primary":
                    color = (theme: Theme) => theme.palette.primary.main;
                    break;
                  case "secondary":
                    color = (theme: Theme) => theme.palette.secondary.main;
                    break;
                  default:
                }
                let fill: string | undefined = item.fill;
                switch (item.fill) {
                  case "primary":
                    fill = theme.palette.primary.main;
                    break;
                  case "secondary":
                    fill = theme.palette.secondary.main;
                    break;
                  default:
                }
                let stroke: string | undefined = item.stroke;
                switch (item.stroke) {
                  case "primary":
                    stroke = theme.palette.primary.main;
                    break;
                  case "secondary":
                    stroke = theme.palette.secondary.main;
                    break;
                  default:
                }
                return (
                  <IconBox
                    key={idx}
                    border={`1px solid ${Object.is(props, item) ? "blue" : "none"}`}
                    title="Click to view code"
                    onClick={() => setProps(item)}
                  >
                    <CustomIcon icon={Icon} width={item.width} color={color} fill={fill} stroke={stroke} />
                  </IconBox>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Modal>
    </IconBox>
  );
};

const ItemConvert = ({ name, Icon }: { name: string; Icon: string }) => {
  const [open, setOpen] = useState(false);
  const svgName = Icon.split("/").slice(-1)[0];
  const svgNameArray = svgName.split(".");
  const theme = useTheme();
  const svgOriginName = svgNameArray[0] + "." + svgNameArray[2];
  const stringify = `export { ReactComponent as ${name} } from "./icons/${svgOriginName}";`;
  return (
    <IconBox key={name}>
      <StyledImage width={60} src={Icon} title={"svg " + name + ": " + Icon} onClick={() => setOpen(!open)} />
      <Modal
        open={open}
        onClose={() => setOpen(!open)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box>
          <Box width={700} sx={{ background: theme.palette.common.white, padding: "30px" }}>
            <TextareaAutosize
              value={stringify}
              style={{
                width: "calc(100% - 30px)",
                marginBottom: "20px",
                fontSize: 14,
                padding: 15,
                resize: "vertical"
              }}
              minRows={3}
            />
          </Box>
        </Box>
      </Modal>
    </IconBox>
  );
};

const Icons = () => {
  return (
    <StyledContainer>
      <Group>
        <Title>Introduction CustomIcon</Title>
        <p style={{ color: "red" }}>
          Chỉ nên áp dụng với icon đơn giản, 1-2 màu (2 màu gồm cả stroke và fill), các Icon có kích thước lớn nhiều màu
          thì sử dụng luôn ảnh gốc
        </p>
        <p>
          + Yêu cầu phải truyền ít nhất <b>width</b> hoặc <b>height</b>.
        </p>
        <p>
          + Nếu biết trước width và height gốc thì truyền vào originWidth, originHeight sẽ hiển thị ảnh ngay lần đầu
          render, nếu không sẽ phải chờ sau lần render để kiểm tra size ảnh mới hiển thị.
        </p>
        <p>+ Sử dụng fill hoặc stroke (tùy vào svg) = "currentColor" để lấy màu theo color của parent</p>
        <p>+ Sử dụng fill hoặc stroke = {"{color}"} để hiển thị màu, có thể sử dụng useTheme() để lấy màu theo theme</p>
        <p>+ Có thể sử dụng fill | stroke "currentColor" color={"{theme=> string}"} để hiển thị màu theo theme.</p>
      </Group>
      <Group>
        <Title>SVG active</Title>
        <IconList>
          {Object.entries(icons).map(([name, Icon]) => {
            if (typeof Icon !== "string") return <Item key={name} name={name} Icon={Icon} />;
            return null;
          })}
        </IconList>
      </Group>
      <Group>
        <Title>SVG pending</Title>
        <IconList>
          {Object.entries(icons).map(([name, Icon]) => {
            if (typeof Icon === "string")
              if (Icon.includes(".svg")) return <ItemConvert key={name} name={name} Icon={Icon} />;
            return null;
          })}
        </IconList>
      </Group>
      <Group>
        <Title>Image</Title>
        <IconList>
          {Object.entries(icons).map(([name, Icon]) => {
            if (typeof Icon === "string")
              if (!Icon.includes(".svg"))
                return (
                  <IconBox key={name}>
                    <StyledImage width={60} src={Icon} title={"img " + name + ": " + Icon} />{" "}
                  </IconBox>
                );
            return null;
          })}
        </IconList>
      </Group>
    </StyledContainer>
  );
};

export default Icons;
