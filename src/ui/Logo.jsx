import styled from "styled-components";
import { useDarkMode } from "../contexts/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: ${(props) => props.height || "6.5rem"};
  width: auto;
`;

function Logo({ height }) {
  const { isDarkMode } = useDarkMode();
  return (
    <StyledLogo>
      <Img
        height={height}
        src={isDarkMode ? "logo-dark.png" : "/logo-light.png"}
        alt="Logo"
      />
    </StyledLogo>
  );
}

export default Logo;
