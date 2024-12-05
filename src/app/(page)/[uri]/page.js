import { Page } from "@/models/Page";
import { User } from "@/models/User";
import { Event } from "@/models/Event";
import {
  faDiscord,
  faFacebook,
  faGithub,
  faInstagram,
  faTelegram,
  faTiktok,
  faWhatsapp,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLink,
  faLocationDot,
  faMobile,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mongoose from "mongoose";
import { btoa } from "next/dist/compiled/@edge-runtime/primitives";
import Image from "next/image";
import Link from "next/link";
import Popover from "@/components/Popover";

export const buttonsIcons = {
  email: faEnvelope,
  mobile: faPhone,
  instagram: faInstagram,
  facebook: faFacebook,
  discord: faDiscord,
  tiktok: faTiktok,
  youtube: faYoutube,
  whatsapp: faWhatsapp,
  github: faGithub,
  telegram: faTelegram,
};

function buttonLink(key, value) {
  if (key === "mobile") {
    return "tel:" + value;
  }
  if (key === "email") {
    return "mailto:" + value;
  }
  return value;
}

export default async function UserPage({ params }) {
  const uri = params.uri;
  mongoose.connect(process.env.MONGO_URI);
  const page = await Page.findOne({ uri });
  // Check if the page was not found
  if (!page) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <p
          style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center" }}
        >
          Page Not Found
        </p>
      </div>
    );
  }

  const user = await User.findOne({ email: page.owner });

  // Optionally, also check if the user was not found
  if (!user) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <p
          style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center" }}
        >
          User Not Found
        </p>
      </div>
    );
  }
  await Event.create({ uri: uri, page: uri, type: "view" });
  return (
    <div style={{ backgroundColor: page.pageBgColor }} className="bg-white min-h-screen">
      <div
        className="h-36 bg-gray-400 bg-cover bg-center"
        style={
          page.bgType === "color"
            ? { backgroundColor: page.bgColor }
            : { backgroundImage: `url(${page.bgImage})` }
        }
      ></div>
      <div className="aspect-square w-36 h-36 mx-auto relative -top-16 -mb-12">
        <Image
          className="rounded-full w-full h-full object-cover"
          src={user.image}
          alt="avatar"
          width={256}
          height={256}
        />
      </div>
      <h2 style={{ color: page.textColor }} className="text-2xl text-center mb-1">{page.displayName}</h2>
      <div className="max-w-xs mx-auto text-center my-2">
        <p style={{ color: page.textColor }} >{page.bio}</p>
      </div>
      <div className="flex gap-2 justify-center mt-4 pb-4">
        {Object.keys(page.buttons).map((buttonKey) => {
          if (buttonKey == "email") {
            return (
              <Popover key={buttonKey} buttonKey={buttonKey} buttonsIcons={buttonsIcons} page={page} />
            )
          } else {
            return (
              <Link
                target="_blank"
                key={buttonKey}
                href={buttonLink(buttonKey, page.buttons[buttonKey])}
                className={`rounded-full text-black p-2 flex items-center justify-center border hover:scale-105 transform transition-all duration-300 ease-in-out hover:bg-gray-100`}
                style={{ borderColor: page.btnIconColor }}
              >
                <FontAwesomeIcon
                  className="w-5 h-5"
                  style={{ color: page.btnIconColor }}
                  icon={buttonsIcons[buttonKey]}
                />
              </Link>
            )
          }
        }
        )}
      </div>
      <div className="max-w-2xl mx-auto grid md:grid-cols-1 gap-6 p-4 px-8">
        {page.links.map((link) => (
          <Link
            key={link.url}
            target="_blank"
            ping={
              "api/click?url=" +
              btoa(link.url) +
              "&page=" +
              page.uri
            }
            style={{ backgroundColor: link.infillColor, borderColor: link.outlineColor, color: link.textColor }}
            className="bg-white p-2 flex hover:bg-gray-100 rounded-md font-extrabold border-2 border-black"
            href={link.url.startsWith("http://") || link.url.startsWith("https://") ? link.url : "https://" + link.url}
          >
            <div className="w-18 mr-5">
              <div className="w-16 h-16 aspect-square flex items-center justify-center rounded-full">
                {link.icon && (
                  <Image
                    className="w-full h-full object-cover rounded-full"
                    src={link.icon}
                    alt={"icon"}
                    width={64}
                    height={64}
                  />
                )}
                {!link.icon && (
                  <FontAwesomeIcon icon={faLink} className="w-8 h-8" />
                )}
              </div>
            </div>
            <div className="flex items-center justify-center shrink grow-0 overflow-hidden">
              <div className="">
                <h3 className="">{link.title}</h3>
                <p style={{ color: link.textColor }} className="text-sm text-gray-400 overflow-hidden">
                  {link.subtitle}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center mt-14 mb-2 underline">
        <Link target="_blank" style={{ fontFamily: "Alilato" }} className="font-semibold" href="/signup">Sign Up to Taptrick Links</Link>
        <Image src="/assets/logo.webp" alt="Taptrick Logo" width={48} height={48} />
      </div>
    </div>
  );
}
