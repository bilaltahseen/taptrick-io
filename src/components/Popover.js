'use client';

import Link from "next/link";

const { FontAwesomeIcon } = require("@fortawesome/react-fontawesome");

function buttonLink(key, value) {
  if (key === "mobile") {
    return "tel:" + value;
  }
  if (key === "email") {
    return "mailto:" + value;
  }
  return value;
}

const Popover = ({ page, buttonsIcons, buttonKey }) => {


  
  const togglePopover = () => {
    alert(page.buttons[buttonKey]);
  }

  return (
    <>
      <div onClick={togglePopover} style={{ borderColor: page.btnIconColor }} className="sm:hidden flex cursor-pointer rounded-full text-black p-2 flex items-center justify-center border hover:scale-105 transform transition-all duration-300 ease-in-out hover:bg-gray-100">
        <FontAwesomeIcon
          className="w-5 h-5"
          style={{ color: page.btnIconColor }}
          icon={buttonsIcons[buttonKey]}
        />
      </div>
      <Link
        target="_blank"
        key={buttonKey}
        href={buttonLink(buttonKey, page.buttons[buttonKey])}
        className={`sm:flex hidden rounded-full text-black p-2 flex items-center justify-center border hover:scale-105 transform transition-all duration-300 ease-in-out hover:bg-gray-100`}
        style={{ borderColor: page.btnIconColor }}
      >
        <FontAwesomeIcon
          className="w-5 h-5"
          style={{ color: page.btnIconColor }}
          icon={buttonsIcons[buttonKey]}
        />
      </Link>
    </>
  )
}

export default Popover;