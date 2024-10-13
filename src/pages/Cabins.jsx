import { useState } from "react";
import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";

function Cabins() {
  const [showCabin, setShowCabin] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter/Sort</p>
      </Row>
      <Row>
        <CabinTable />
        <Button onClick={() => setShowCabin((show) => !show)}>Add Cabin</Button>
        {showCabin && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
