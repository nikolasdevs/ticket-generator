"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { jeju, roadRage, roboto } from "../fonts";
import { getTicketData, saveTicketData } from "../utils/indexedDB";

interface Errors {
  selectedAccess?: string;
}
const TicketBox = () => {
  const [selectedAccess, setSelectedAccess] = useState<string | null>(null);
  const [attendeeCount, setAttendeeCount] = useState<number>(1);
  const [errors, setErrors] = useState<Errors>({});

  const router = useRouter();

  const handleSelectedAccess = (accessType: string) => {
    setSelectedAccess(accessType);
  };

  const handleCancelSelection = async () => {
    const existingTicketData = await getTicketData();

    if (existingTicketData) {
      await saveTicketData({ ...existingTicketData, accessType: "" });
    }
  };

  const validateTktSelection = () => {
    const errors: Errors = {};
    if (!selectedAccess)
      errors.selectedAccess = "Kindly select your access type";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (validateTktSelection()) {
      await saveTicketData({ accessType: selectedAccess!, attendeeCount });
      router.push("/attendee-details");
    } else {
    }
  };

  return (
    <div className="  px-3 md:w-full w-full pb-4">
      <div
        className={`${roboto.className} max-w-[700px] sm:h-auto m-auto border-secondary border bg-ticket_box bg-opacity-40 flex flex-col gap-8 items-center justify-center sm:p-12 p-6 sm:rounded-[40px] rounded-[32px] `}
      >
        <div className="w-full flex flex-col gap-3">
          <div className="flex justify-between sm:items-center items-start w-full flex-col xs:bg-green-300 ">
            <h2
              className={`${jeju.className} sm:text-[32px] text-2xl text-foreground`}
            >
              Ticket Selection
            </h2>
            <p>Step 1/3</p>
          </div>{" "}
          <div className="w-full h-1 bg-secondary rounded-3xl relative">
            {" "}
            <div className="w-[40%] h-1 bg-primary rounded-3xl absolute top-0 "></div>
          </div>
        </div>

        <div className="sm:bg-ticket_box_background w-full sm:p-6 sm:rounded-[32px] sm:border sm:border-secondary flex flex-col gap-8 ">
          <div className=" flex flex-col items-center sm:justify-center justify-between gap-2 sm:p-6 py-4 px-5 border-2 border-ticket_box_border rounded-3xl border-t-0 h-[243px] bg-gradient">
            <div className="flex flex-col gap-2 items-center justify-center ">
              <h3
                className={`${roadRage.className} text-foreground sm:text-[62px] text-[3rem]`}
              >
                Techember Fest ”25
              </h3>
              <p className="sm:w-[340px] text-center text-sm sm:text-base w-[239px]">
                Join us for an unforgettable experience at Techember Fest ”25!
                Secure your spot now.
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center md:gap-4 gap-1">
              <p>📍 04 Rumens road, Ikoyi, Lagos</p>
              <p className="hidden md:block">||</p>
              <p>March 15, 2025 | 7:00 PM</p>
            </div>
          </div>

          <div className="w-full h-1 bg-ticket_box_border "></div>

          <div className="select-type w-full flex flex-col gap-2">
            <p className="w-full">Select Ticket Type:</p>
            <div className="w-full bg-ticket_select flex md:flex-row flex-col  items-center justify-between sm:gap-2 gap-6 p-4 border border-ticket_box_border rounded-3xl">
              {["REGULAR ACCESS", "VIP ACCESS", "VVIP ACCESS"].map(
                (type, index) => (
                  <button
                    key={index}
                    className={`flex flex-col items-start justify-start gap-3 p-3  w-full h-auto border-2 border-secondary_light rounded-xl btn_hover ${
                      selectedAccess === type
                        ? " bg-access_bg_selected text-white border-secondary_light"
                        : " bg-transparent"
                    } `}
                    onClick={() => handleSelectedAccess(type)}
                  >
                    <div className="font-semibold text-2xl ">
                      {" "}
                      <p>
                        {type === "REGULAR ACCESS"
                          ? "Free"
                          : type === "VIP ACCESS"
                          ? "$50"
                          : "$150"}
                      </p>
                    </div>
                    <div className="flex flex-col items-start w-full ">
                      <p>{type}</p>
                      <p className="text-sm">20/52</p>
                    </div>
                  </button>
                )
              )}
            </div>
            {errors.selectedAccess && (
              <p className="text-red-500">{errors.selectedAccess}</p>
            )}
          </div>

          <div className="select-type w-full flex flex-col gap-2">
            <p className="w-full"> Number of Tickets</p>
            <select
              className="w-full bg-ticket_select flex  justify-between  items-center gap-2 p-3 border border-ticket_box_border rounded-xl outline-none"
              value={attendeeCount}
              onChange={(e) => setAttendeeCount(Number(e.target.value))}
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full sm:h-12 sm:bg-ticket_select flex flex-col sm:flex-row  justify-between  items-center sm:gap-8 gap-4 sm:px-12 sm:border sm:border-ticket_box_border rounded-3xl ">
            <Link
              href="../attendee-details"
              className="py-3 px-6 rounded-lg bg-primary text-center w-full sm:hidden btn_hover"
              onClick={handleNext}
            >
              <button className="">Next</button>
            </Link>
            <Link
              href="/"
              onClick={handleCancelSelection}
              className="py-3 px-6 text-center text-primary rounded-lg bg-transparent border border-primary w-full btn_hover"
            >
              <button className="">Cancel</button>
            </Link>
            <Link
              href="../attendee-details"
              className="py-3 px-6 rounded-lg bg-primary text-center w-full hidden sm:block btn_hover"
              onClick={handleNext}
            >
              <button className="">Next</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TicketBox;
