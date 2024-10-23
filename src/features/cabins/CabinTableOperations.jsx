import Filter from "../../ui/Filter";
import Sortby from "../../ui/Sortby";
import TableOperations from "../../ui/TableOperations";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "with-discount", label: "With Discount" },
          { value: "no-discount", label: "No Discount" },
        ]}
      />

      <Sortby
        options={[
          { value: "name-asc", label: "Sort By Name (A-Z)" },
          { value: "name-desc", label: "Sort By Name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort By Price (Low to High)" },
          { value: "regularPrice-desc", label: "Sort By Price (High to Low)" },
          { value: "maxCapacity-asc", label: "Sort By Capacity (Low to High)" },
          {
            value: "maxCapacity-desc",
            label: "Sort By Capacity (High to Low)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
