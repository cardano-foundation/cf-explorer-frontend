import { Skeleton } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface ITokenLogo {
  tokenId: string;
  className?: string;
}

const TokenLogo: React.FC<ITokenLogo> = ({ tokenId, className }) => {
  const [logo, setLogo] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function loadImage() {
      setLoading(true);
      const {
        data: { logo },
      } = await axios.get(`/metadata/${tokenId}`);
      setLogo(logo.value);
      setLoading(false);
    }
    loadImage();
  }, []);

  if (loading) return <Skeleton variant="rectangular" className={className} />;
  return <img src={`data:/image/png;base64,${logo}`} alt="Icon Logo" className={className} />;
};

export default TokenLogo;
