import GlobaleStyles from "./styles/GlobleStyles";
import Button from "./ui/Button";
import Heading from "./ui/Heading";
import Input from "./ui/Input";

function App() {
  return (
    <>
      <GlobaleStyles />
      <Heading as="h1">The Royal Stay</Heading>
      <Heading as="h2">Place fo royals to stay </Heading>
      <Input placeholder="Enter the shit here" />
      <Button>TEST BTN</Button>
    </>
  );
}

export default App;
