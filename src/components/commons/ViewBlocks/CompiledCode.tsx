import { CompiledCodeButton } from "./styles";

const CompiledCode: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return <CompiledCodeButton onClick={() => onClick?.()}>Compiled Code {"{ }"}</CompiledCodeButton>;
};

export default CompiledCode;
