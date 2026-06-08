import styled from "styled-components";
import { useParams } from "react-router-dom";
import { AuthView } from "@neondatabase/auth-ui";
import Logo from "../ui/Logo";

const AuthShell = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem 1.6rem;
  background-color: var(--color-grey-50);
  overflow: auto;
`;

/*
 * The app's root font-size is 62.5% (1rem = 10px), which shrinks the
 * rem-based Neon Auth UI to ~62% of its intended size. `zoom` scales the
 * whole unit — logo, text, inputs, spacing and width together — back up and
 * a little larger, so the sign-in card reads comfortably while keeping the
 * original proportions intact.
 *
 * Logo and form share this one centered column, so they're aligned to the
 * same width as a single cohesive block.
 */
const AuthStack = styled.div`
  zoom: 1.8;
  width: 100%;
  max-width: 24rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;
`;

const CardWrapper = styled.div`
  width: 100%;
`;

// Renders the prebuilt Neon Auth UI. The `:authView` route param selects the
// view: "sign-in", "sign-up", "forgot-password", "reset-password", etc.
function AuthPage() {
  const { authView } = useParams();

  return (
    <AuthShell>
      <AuthStack>
        <Logo height="5.5rem" />
        <CardWrapper>
          <AuthView pathname={authView} />
        </CardWrapper>
      </AuthStack>
    </AuthShell>
  );
}

export default AuthPage;
