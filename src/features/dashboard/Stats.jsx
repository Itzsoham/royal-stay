import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinsCount }) {
  // 1>
  const numBookings = bookings.length;

  // 2>
  const sales = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);

  // 3>
  const numCheckIns = confirmedStays.length;

  // 4>
  // num of checked-in nights / all available nights ( num of days * num of cabins)
  const occupancyRate =
    (confirmedStays.reduce((acc, booking) => acc + booking.numNights, 0) /
      (cabinsCount * numDays)) *
    100;

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        value={numBookings}
        icon={<HiOutlineBriefcase />}
      />
      <Stat
        title="Sales"
        color="green"
        value={formatCurrency(sales)}
        icon={<HiOutlineBanknotes />}
      />
      <Stat
        title="Check ins"
        color="indigo"
        value={numCheckIns}
        icon={<HiOutlineCalendarDays />}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        value={Math.round(occupancyRate) + "%"}
        icon={<HiOutlineChartBar />}
      />
    </>
  );
}

export default Stats;
