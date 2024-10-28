import Button from "../../ui/Button";
import { useCheckingOut } from "./useCheckingOut";

function CheckoutButton({ bookingId }) {
  const { isCheckingOut, checkout } = useCheckingOut();

  return (
    <Button
      onClick={() => checkout(bookingId)}
      disabled={isCheckingOut}
      $variation="primary"
      $size="small"
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
