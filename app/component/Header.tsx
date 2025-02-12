import Image from "next/image";
import logo from "../../public/ticz-logo.svg";
import { jeju } from "../fonts";
const Header = () => {
  return (
    <div
      className={`${jeju.className} font-roboto max-w-[1200px] h-[76px] m-auto border-secondary_light border bg-header bg-opacity-40 flex items-center px-4 py-3 rounded-3xl mt-8`}
    >
      <div className="flex justify-between items-center w-full">
        <Image src={logo} alt="Logo" width={64} height={64} />
        <div className="flex items-center gap-4">
          <div className="text-lg  text-foreground">Events</div>
          <div className="text-lg  text-foreground">My Tickets</div>
          <div className="text-lg  text-foreground">About Project</div>
        </div>
        <div>
          <button className="px-6 py-4 text-gray text-lg bg-foreground rounded-xl">
            MY TICKETS
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
