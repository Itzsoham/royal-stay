import { useState } from "react";
import styled from "styled-components";
import { isFuture, isPast, isToday } from "date-fns";
import { neon } from "../services/neon";
import Button from "../ui/Button";
import { subtractDates } from "../utils/helpers";

import { bookings } from "./data-bookings";
import { cabins } from "./data-cabins";
import { guests } from "./data-guests";

// const originalSettings = {
//   minBookingLength: 3,
//   maxBookingLength: 30,
//   maxGuestsPerBooking: 10,
//   breakfastPrice: 15,
// };

async function deleteGuests() {
  const { error } = await neon.from("guests").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteCabins() {
  const { error } = await neon.from("cabins").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteBookings() {
  const { error } = await neon.from("bookings").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function createGuests() {
  const { error } = await neon.from("guests").insert(guests);
  if (error) console.log(error.message);
}

async function createCabins() {
  const { error } = await neon.from("cabins").insert(cabins);
  if (error) console.log(error.message);
}

async function createBookings() {
  // Bookings need a guestId and a cabinId. We can't tell Supabase IDs for each object, it will calculate them on its own. So it might be different for different people, especially after multiple uploads. Therefore, we need to first get all guestIds and cabinIds, and then replace the original IDs in the booking data with the actual ones from the DB
  const { data: guestsIds } = await neon
    .from("guests")
    .select("id")
    .order("id");
  const allGuestIds = guestsIds.map((cabin) => cabin.id);
  const { data: cabinsIds } = await neon
    .from("cabins")
    .select("id")
    .order("id");
  const allCabinIds = cabinsIds.map((cabin) => cabin.id);

  const finalBookings = bookings.map((booking) => {
    // Here relying on the order of cabins, as they don't have and ID yet
    const cabin = cabins.at(booking.cabinId - 1);
    const numNights = subtractDates(booking.endDate, booking.startDate);
    const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
    const extrasPrice = booking.hasBreakfast
      ? numNights * 15 * booking.numGuests
      : 0; // hardcoded breakfast price
    const totalPrice = cabinPrice + extrasPrice;

    let status;
    if (
      isPast(new Date(booking.endDate)) &&
      !isToday(new Date(booking.endDate))
    )
      status = "checked-out";
    if (
      isFuture(new Date(booking.startDate)) ||
      isToday(new Date(booking.startDate))
    )
      status = "unconfirmed";
    if (
      (isFuture(new Date(booking.endDate)) ||
        isToday(new Date(booking.endDate))) &&
      isPast(new Date(booking.startDate)) &&
      !isToday(new Date(booking.startDate))
    )
      status = "checked-in";

    return {
      ...booking,
      numNights,
      cabinPrice,
      extrasPrice,
      totalPrice,
      guestId: allGuestIds.at(booking.guestId - 1),
      cabinId: allCabinIds.at(booking.cabinId - 1),
      status,
    };
  });

  console.log(finalBookings);

  const { error } = await neon.from("bookings").insert(finalBookings);
  if (error) console.log(error.message);
}

const StyledUploader = styled.div`
  margin-top: auto;
  width: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1.6rem;
  background-color: var(--color-grey-50);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
`;

const Title = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  text-align: center;
  color: var(--color-grey-500);
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  min-width: 0;

  & > button {
    width: 100%;
    min-width: 0;
    white-space: normal;
  }
`;

function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);
    // Bookings need to be deleted FIRST
    await deleteBookings();
    await deleteGuests();
    await deleteCabins();

    // Bookings need to be created LAST
    await createGuests();
    await createCabins();
    await createBookings();

    setIsLoading(false);
  }

  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
  }

  function visitWebsite() {
    window.open("https://royal-stay.vercel.app/", "_blank");
  }

  return (
    <StyledUploader>
      <Title>Sample data</Title>
      <Buttons>
        <Button $size="small" onClick={uploadAll} disabled={isLoading}>
          Upload all
        </Button>
        <Button
          $size="small"
          $variation="secondary"
          onClick={uploadBookings}
          disabled={isLoading}
        >
          Upload bookings only
        </Button>
        <Button
          $size="small"
          $variation="secondary"
          onClick={visitWebsite}
          disabled={isLoading}
        >
          Visit the website
        </Button>
      </Buttons>
    </StyledUploader>
  );
}

export default Uploader;
