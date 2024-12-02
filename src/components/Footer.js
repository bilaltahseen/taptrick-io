import Link from 'next/link';
import Image from 'next/image';
import { faFacebookF, faLinkedinIn, faXTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Footer() {
  return (
    <footer className="bg-white border-t py-4 mt-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-between items-center">
        {/* Logo and Name */}
        <div className="flex items-center text-black hover:text-gray-700 mb-1 md:mb-0">
          <Image
            src={'/assets/logo.webp'}
            alt="logo"
            height={40}
            width={40}
          />
        </div>

        {/* Copyright for mobile */}
        <div className="w-full text-center text-sm text-gray-500 order-3 md:order-2 md:w-auto mt-1 md:mt-0 md:flex-1 md:text-center">
          © {new Date().getFullYear()} Taptrick. All rights reserved.
        </div>

        {/* Social Media Icons */}
        <div className="flex items-center gap-4 order-2 md:order-3 mb-1 md:mb-0">
          <Link href="https://x.com/taptrickio" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-800">
            <FontAwesomeIcon icon={faXTwitter} height={"1.5em"} />
          </Link>
          <Link href="https://www.facebook.com/profile.php?id=61566870231503" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-800">
            <FontAwesomeIcon icon={faFacebookF} height={"1.5em"} />
          </Link>
          <Link href="https://www.linkedin.com/company/105237098/admin/dashboard/" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-800">
            <FontAwesomeIcon icon={faLinkedinIn} height={"1.5em"} />
          </Link>
          <Link href="https://www.instagram.com/taptrick.io/?hl=en" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-800">
            <FontAwesomeIcon icon={faInstagram} height={"1.5em"} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
