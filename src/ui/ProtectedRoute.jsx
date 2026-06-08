import styled from "styled-components";
import {
  SignedIn,
  SignedOut,
  AuthLoading,
  RedirectToSignIn,
} from "@neondatabase/auth-ui";
import Spinner from "./Spinner";

const FullPage = styled.div`
  height: 100vh;
  /* width: 100vw; */
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Neon Auth state machine:
//  - while resolving the session -> spinner
//  - signed in  -> render the app
//  - signed out -> redirect to /auth/sign-in (RedirectToSignIn uses our router)
function ProtectedRoute({ children }) {
  return (
    <>
      <AuthLoading>
        <FullPage>
          <Spinner />
        </FullPage>
      </AuthLoading>

      <SignedIn>{children}</SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

export default ProtectedRoute;
