import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {faFacebookF,faLinkedinIn,faXTwitter,faInstagram} from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const metadata = {
  title: "Taptrick | Contact",
  description:
    "Share your links, social profiles, contact info and more on one page",
};

export default function Contact() {
  return (
    <div className="flex flex-col items-center min-h-screen py-2">
      <main className="flex flex-col items-center w-full flex-1 px-4 md:px-20 text-center">
        <Image
          src={"/assets/logo.webp"}
          alt="banner image"
          height={400}
          width={400}
        />
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-8">
          Get in Touch
        </h1>

        <div className="flex flex-wrap justify-center gap-6 text-black">
          <a
            href="https://x.com/taptrickio"
            className="hover:text-gray-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faXTwitter} height={"2em"}  />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61566870231503"
            className="hover:text-gray-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faFacebookF} height={"2em"}  />
          </a>
          <a
            href="https://www.linkedin.com/company/105237098/admin/dashboard/"
            className="hover:text-gray-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedinIn} height={"2em"}  />
          </a>

          <a
            href="https://www.instagram.com/taptrick.io/?hl=en"
            className="hover:text-black"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} height={"2em"}  />
          </a>
         
        </div>
      </main>
    </div>
  );
}
