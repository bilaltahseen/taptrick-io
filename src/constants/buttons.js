import { faDiscord, faFacebook, faGithub, faInstagram, faInstagramSquare, faTelegram, faTiktok, faWhatsapp, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faGripLines, faMobile, faPlus, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";


export const allButtons = [
    { key: 'email', 'label': 'e-mail', icon: faEnvelope, placeholder: 'test@example.com' },
    { key: 'mobile', 'label': 'mobile', icon: faMobile, placeholder: '+46 123 123 123' },
    { key: 'instagram', 'label': 'instagram', icon: faInstagram, placeholder: 'https://facebook.com/profile/...' },
    { key: 'facebook', 'label': 'facebook', icon: faFacebook },
    { key: 'discord', 'label': 'discord', icon: faDiscord },
    { key: 'tiktok', 'label': 'tiktok', icon: faTiktok },
    { key: 'youtube', 'label': 'youtube', icon: faYoutube },
    { key: 'whatsapp', 'label': 'whatsapp', icon: faWhatsapp },
    { key: 'github', 'label': 'github', icon: faGithub },
    { key: 'telegram', 'label': 'telegram', icon: faTelegram },
];