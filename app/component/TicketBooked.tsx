"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import star from "../../public/Icon/Icon/star.svg";
import ticketBg from "../../public/Icon/Icon/ticketBg.svg";
import { alatsi, jeju, roadRage, roboto } from "../fonts";
import { getFormData } from "../utils/indexedDB";

const TicketBooked = () => {
  const [data, setData] = useState<{
    fullName: string;
    email: string;
    avatarUrl: string;
    details: string;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = await getFormData();
        if (
          formData &&
          formData.fullName &&
          formData.email &&
          formData.avatarUrl &&
          formData.details
        ) {
          setData({
            fullName: formData.fullName,
            email: formData.email,
            avatarUrl: formData.avatarUrl,
            details: formData.details,
          });
        }
      } catch {}
    };
    fetchData();
  });

  return (
    <div
      className={`${roboto.className} w-[700px] h-auto m-auto border-secondary border bg-ticket_box bg-opacity-40 flex flex-col gap-8 items-center p-12 rounded-[40px] mt-8`}
    >
      <div className="w-full flex flex-col gap-3">
        <div className="flex justify-between items-center w-full">
          <h2 className={`${jeju.className} text-[32px] text-foreground`}>
            Ready
          </h2>
          <p>Step 3/3</p>
        </div>{" "}
        <div className="w-full h-1 bg-secondary rounded-3xl relative">
          {" "}
          <div className="w-[40%] h-1 bg-primary rounded-3xl absolute top-0 "></div>
        </div>
      </div>
      <div className="bg-ticket_box_background w-full p-6 rounded-[32px] border border-secondary flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center gap-4 justify-center">
          <p className={`${alatsi.className} text-[32px]`}>
            Your Ticket is Booked!
          </p>
          <p>You can download or Check your email for a copy</p>
        </div>

        <div className=" relative px-5 py-8 ">
          <Image src={ticketBg} alt="Ticket Bg" />
          <div className=" flex items-start gap-6 absolute top-11 left-8 ">
            <div className=" w-[120.38px] h-[117px] rounded-[5.62px] overflow-hidden ">
              <Image
                src={data?.avatarUrl || "/default-avatar.png"}
                alt="User Avatar"
                // layout="fill"
                // objectFit="contain"
                width={120}
                height={117}
              />
            </div>
            <div className=" flex flex-col gap-2">
              <div className=" flex  gap-2 items-start ">
                <h3
                  className={`${roadRage.className} text-foreground text-[55px] w-40 leading-[2.5rem] `}
                >
                  Techember Fest ”25
                </h3>
                <Image src={star} alt="Reg Image" height={64} width={64} />
              </div>
              <div className="flex flex-col  gap-[2.42px] text-sm">
                <p>📍 04 Rumens road, Ikoyi, Lagos</p>
                <p>📅 March 15, 2025 | 7:00 PM</p>
              </div>
            </div>
          </div>
          <div className=" flex  gap-2 items-start -rotate-90 absolute top-[6.5rem] -right-5 ">
            {" "}
            <Image src={star} alt="Reg Image" height={40} width={40} />
            <div className=" flex flex-col items-start ">
              <p
                className={`${roadRage.className} text-foreground text-xl leading-4`}
              >
                Techember Fest ”25
              </p>
              <p className=" text-xs">User Name: {data?.fullName}</p>
            </div>
          </div>
        </div>

        <div className="w-full h-12 bg-ticket_select flex  justify-between  items-center gap-8 px-12 border border-ticket_box_border rounded-3xl">
          <Link
            href="/attendee-details"
            className="py-3 px-6 text-center text-primary rounded-lg bg-transparent border border-primary w-full"
          >
            <button className="">Book Another Ticket</button>
          </Link>
          <Link
            href="#"
            className="py-3 px-6 rounded-lg bg-primary text-center w-full"
          >
            <button className="">Download Ticket</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default TicketBooked;
