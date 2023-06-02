import React from "react";

import { Icon } from "./styles";

const SVGIcon: React.FC<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>> = (
  props
) => <Icon {...props} />;

export default SVGIcon;
