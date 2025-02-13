"use client";
import { toPng } from "html-to-image";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import barCode from "../../public/Icon/Icon/BarCode.svg";
import bg from "../../public/Icon/Icon/bg.svg";
import { alatsi, jeju, roadRage, roboto } from "../fonts";
import {
  clearFormData,
  clearTicketData,
  getFormData,
  getTicketData,
} from "../utils/indexedDB";

const TicketBooked = () => {
  const [data, setData] = useState<{
    fullName: string;
    email: string;
    avatarUrl: string;
    details: string;
  } | null>(null);

  const [ticketData, setTicketData] = useState<{
    accessType: string;
    attendeeCount: number;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  const handleResetIndexedDB = async () => {
    await clearFormData();
    await clearTicketData();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [formData, tktData] = await Promise.all([
          getFormData(),
          getTicketData(),
        ]);

        if (formData) {
          setData(formData);
        }
        if (tktData) {
          setTicketData(tktData);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const downloadTicket = async (): Promise<void> => {
    const ticketElement = document.getElementById("ticket-wrapper");

    if (!ticketElement) {
      console.error("Ticket element not found");
      return;
    }

    setTimeout(async () => {
      try {
        const dataUrl = await toPng(ticketElement);
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "ticket.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error generating ticket image:", error);
      }
    }, 300);
  };
  return (
    <div className=" px-3 md:w-full w-full pb-4 mt-[10rem] ">
      <div
        className={`${roboto.className}  max-w-[700px] h-auto m-auto border-secondary border bg-ticket_box bg-opacity-40 flex flex-col gap-8 items-center sm:p-12 px-6 py-8 sm:rounded-[40px] rounded-3xl mt-8`}
      >
        <div className="w-full flex flex-col gap-3">
          <div className="flex justify-between items-center w-full">
            <h2
              className={`${jeju.className} sm:text-[32px] text-2xl text-foreground`}
            >
              Ready
            </h2>
            <p>Step 3/3</p>
          </div>{" "}
          <div className="w-full h-1 bg-secondary rounded-3xl relative">
            {" "}
            <div className="w-[80%] h-1 bg-primary rounded-3xl absolute top-0 "></div>
          </div>
          <div className=" flex flex-col gap-3 items-center justify-center py-8">
            <h3 className={`${alatsi.className} text-2xl font-bold`}>
              Your Ticket is Booked!
            </h3>
            <p className=" text-center">
              You can download or Check your email for a copy
            </p>
          </div>
        </div>
        <div id="ticket-wrapper" className="">
          <div
            className=" w-[300px] h-[600px]  flex flex-col items-center justify-center relative"
            id="ticket-content"
          >
            <div className=" w-full ">
              <Image src={bg} alt="background" />
            </div>
            <div className="bg-ticket_box/10 w-[260px] h-[446px] p-[14px] rounded-2xl border border-primary flex flex-col items-center justify-center absolute top-5">
              {loading ? (
                <p className="text-white/50 text-lg">Loading...</p>
              ) : (
                <div className=" flex flex-col items-center justify-center gap-5  w-[232px] h-[416px]  ">
                  <div className="flex flex-col items-center justify-center">
                    <p className={`${roadRage.className} text-[32px]`}>
                      Techember Fest ”25
                    </p>
                    <div className="flex flex-col items-center justify-center text-[10px]">
                      <p>📍 04 Rumens road, Ikoyi, Lagos</p>
                      <p>📅 March 15, 2025 | 7:00 PM</p>
                    </div>
                  </div>

                  <div className=" w-[140px] h-[140px] rounded-xl overflow-hidden border-4 border-primary border-opacity-50">
                    <Image
                      src={data?.avatarUrl || "/default-avatar.png"}
                      alt="User Avatar"
                      width={140}
                      height={140}
                      className="rounded-xl w-full h-full object-cover"
                    />
                  </div>
                  <div className=" w-full h-[160px] bg-ticket_book_bg flex flex-col items- justify-center border  border-ticket_book_outline rounded-lg p-1">
                    <div className="flex gap-2  w-full border-b border-access_bg_selected h-[45px] text-[10px]   ">
                      <div className=" flex flex-col gap-1 p-1 w-full    border-r border-access_bg_selected">
                        <p className=" text-white/30">Enter your name</p>
                        <p className="font-bold">{data?.fullName}</p>
                      </div>
                      <div className=" flex flex-col gap-1 p-1  w-full  ">
                        {" "}
                        <p className=" text-white/30">Enter your email *</p>
                        <p className="font-bold ">{data?.email}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full border-b border-access_bg_selected h-[45px] text-[10px]">
                      <div className="flex flex-col gap-1 p-1 w-full   border-r border-access_bg_selected">
                        {" "}
                        <p className=" text-white/30">Ticket Type:</p>
                        <p>{ticketData?.accessType}</p>
                      </div>
                      <div className=" flex flex-col gap-1 p-1  w-full  ">
                        <p className=" text-white/30">Ticket for:</p>
                        <p>{ticketData?.attendeeCount}</p>
                      </div>
                    </div>
                    <div className="text-[10px] flex flex-col gap-1 p-2">
                      <p className="text-white/30">Special request?</p>
                      <p>{data?.details || "Nil"}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="w-[230px] h-[68] absolute bottom-5">
              <Image src={barCode} alt="Bar Code" className=" w-full" />
            </div>
          </div>
        </div>
        <div className="w-full flex sm:flex-row flex-col justify-between items-center sm:gap-8 gap-4">
          <button
            type="button"
            className={`${jeju.className} py-3 px-6 text-center rounded-lg bg-primary text-foreground w-full sm:hidden`}
          >
            Download Ticket
          </button>
          <Link
            href={"/"}
            onClick={handleResetIndexedDB}
            className={`${jeju.className} btn_hover py-3 px-6 text-center text-primary rounded-lg bg-transparent border border-primary w-full`}
          >
            <button>Book Another Ticket</button>
          </Link>
          <button
            type="button"
            onClick={downloadTicket}
            className={`${jeju.className} btn_hover py-3 px-6 text-center rounded-lg bg-primary text-foreground w-full hidden sm:block`}
          >
            Download Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketBooked;
