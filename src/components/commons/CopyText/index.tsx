import { useEffect, useState } from "react";
import { IoMdCopy } from "react-icons/io";
import { BiCheckCircle } from "react-icons/bi";
import { useCopyToClipboard } from "react-use";

const CopyText = ({ text }: { text: string }) => {
  const [value, copyToClipboard] = useCopyToClipboard();
  const [copyText, setCopyText] = useState(text);
  useEffect(() => {
    if (text) {
      setCopyText(text);
    }
  }, [text]);

  useEffect(() => {
    if (value.value) {
      setTimeout(() => {
        setCopyText("");
      }, 3000);
    }
  }, [value.value]);

  return (
    <>
      {copyText === value.value ? (
        <BiCheckCircle
          size={20}
        />
      ) : (
        <IoMdCopy
          size={20}
          onClick={() => {
            copyToClipboard(text);
          }}
        />
      )}
    </>
  );
};

export default CopyText;
