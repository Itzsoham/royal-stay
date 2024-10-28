import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoading: isBookingsLoading, bookings } = useRecentBookings();
  const {
    isLoading: isStaysLoading,
    stays,
    confimedStays,
    numDays,
  } = useRecentStays();
  const { cabins, isLoading: isCabinsLoading } = useCabins();

  const isLoading = isBookingsLoading || isStaysLoading || isCabinsLoading;

  if (isLoading) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confimedStays}
        numDays={numDays}
        cabinsCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confimedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
