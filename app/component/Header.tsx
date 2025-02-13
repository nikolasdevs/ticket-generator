import Image from "next/image";
import Link from "next/link";
import arrowIcon from "../../public/Icon/Icon/arrow.svg";
import logo from "../../public/ticz-logo.svg";
import { jeju } from "../fonts";

const Header = () => {
  return (
    <div className=" py-3 px-3 fixed w-full z-50  backdrop-blur-sm  top-8 ">
      <div
        className={`${jeju.className} sm:max-w-[1200px] w-full sm:h-[76px] h-[68px] m-auto  border-secondary_light border bg-header/40  flex items-center px-4 py-3 sm:rounded-3xl rounded-xl  `}
      >
        <div className="flex justify-between items-center w-full ">
          <Link href="/">
            <Image src={logo} alt="Logo" width={96} height={96} />
          </Link>
          <div className="md:flex hidden items-center gap-4 text-gray_light  ">
            <div className="text-lg cursor-pointer hover:text-white focus:text-white">
              Events
            </div>
            <div className="text-lg hover:text-white cursor-pointer">
              My Tickets
            </div>
            <div className="text-lg hover:text-white  cursor-pointer">
              About Project
            </div>
          </div>
          <div>
            <button className="sm:px-6 sm:py-4 px-4 py-3 text-gray border border-ticket_menu_border border-opacity-10 text-lg bg-foreground rounded-xl flex items-center gap-2 hover:bg-primary hover:border-foreground">
              MY TICKETS
              <Image
                src={arrowIcon}
                alt="Arrow Icon"
                height={16}
                width={16}
                className=" hover:-rotate-45"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
