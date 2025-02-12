import Image from "next/image";
import Link from "next/link";
import chevrondown from "../../public/Icon/chevron-down.svg";
import { jeju, roadRage, roboto } from "../fonts";

const TicketBox = () => {
  return (
    <div
      className={`${roboto.className} w-[700px] h-auto m-auto border-secondary border bg-ticket_box bg-opacity-40 flex flex-col gap-8 items-center p-12 rounded-[40px] mt-8`}
    >
      <div className="w-full flex flex-col gap-3">
        <div className="flex justify-between items-center w-full">
          <h2 className={`${jeju.className} text-[32px] text-foreground`}>
            Ticket Selection
          </h2>
          <p>Step 1/3</p>
        </div>{" "}
        <div className="w-full h-1 bg-secondary rounded-3xl relative">
          {" "}
          <div className="w-[40%] h-1 bg-primary rounded-3xl absolute top-0 "></div>
        </div>
      </div>
      <div className="bg-ticket_box_background w-full p-6 rounded-[32px] border border-secondary flex flex-col gap-8">
        <div className=" flex flex-col items-center justify-center gap-2 p-6 border-2 border-ticket_box_border rounded-3xl border-t-0">
          <h3 className={`${roadRage.className} text-foreground text-[62px]`}>
            Techember Fest ”25
          </h3>
          <p className="w-[340px] text-center">
            Join us for an unforgettable experience at Techember Fest ”25!
            Secure your spot now.
          </p>
          <div className="flex items-center justify-center gap-4">
            <p>📍 [Event Location]</p>
            <p>||</p>
            <p>March 15, 2025 | 7:00 PM</p>
          </div>
        </div>

        <div className="w-full h-1 bg-ticket_box_border "></div>

        <div className="select-type w-full flex flex-col gap-2">
          <p className="w-full">Select Ticket Type:</p>
          <div className="w-full bg-ticket_select flex flex-wrap  items-center justify-start gap-2 p-6 border border-ticket_box_border rounded-3xl">
            <div className="flex items-start justify-between gap-2 p-2 w-[242px] bg-secondary_light border border-secondary_light rounded-xl">
              <div className="flex flex-col gap-1 w-full ">
                <p>REGULAR ACCESS</p>
                <p className="text-sm">20 left!</p>
              </div>
              <div className="font-semibold text-xl bg-secondary p-2 flex justify-end   rounded-lg w-1/2">
                {" "}
                <p>Free</p>
              </div>
            </div>

            <div className="flex items-start justify-between gap-2 p-2 w-[242px] bg-transparent border border-ticket_box_border rounded-xl">
              <div className="flex flex-col gap-1 w-full ">
                <p>VIP ACCESS</p>
                <p className="text-sm">20 left!</p>
              </div>
              <div className="font-semibold text-xl bg-secondary p-2 flex flex-col items-end  border border-primary    rounded-lg w-1/2">
                {" "}
                <p>$50</p>
              </div>
            </div>

            <div className="flex items-start justify-between gap-2 p-2 w-[242px] bg-transparent border border-ticket_box_border rounded-xl">
              <div className="flex flex-col gap-1 w-full ">
                <p>VVIP ACCESS</p>
                <p className="text-sm">20 left!</p>
              </div>
              <div className="font-semibold text-xl bg-secondary p-2 flex flex-col items-end border border-primary   rounded-lg w-1/2">
                {" "}
                <p>$150</p>
              </div>
            </div>
          </div>
        </div>
        <div className="select-type w-full flex flex-col gap-2">
          <p className="w-full"> Number of Tickets</p>
          <div className="w-full bg-ticket_select flex  justify-between  items-center gap-2 p-3 border border-ticket_box_border rounded-xl">
            <p>1</p>
            <Image width="24" height="24" src={chevrondown} alt="icon" />
          </div>
        </div>

        <div className="w-full h-12 bg-ticket_select flex  justify-between  items-center gap-8 px-12 border border-ticket_box_border rounded-3xl">
          <Link
            href="/"
            className="py-3 px-6 text-center text-primary rounded-lg bg-transparent border border-primary w-full"
          >
            <button className="">Cancel</button>
          </Link>
          <Link
            href="../attendee-details"
            className="py-3 px-6 rounded-lg bg-primary text-center w-full"
          >
            <button className="">Next</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TicketBox;
