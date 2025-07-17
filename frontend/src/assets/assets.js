import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import logobg from './EaseLogo.png'
import logobg1 from './crop.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import doc16 from './GP1.png'
import hero from './hero.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'
import Banner_Doc from './Banner_Doc.png'
import FDoc1 from './FemaleDoc1.png'
import Header_Doc from './Header_Docs.png'
import GP1 from './GP1.png'
import header from './Header.png'
import icons from './icons.png'
import tilo from './tilo.png'
import icon_rem from './icon_rem.png'
export const assets = {
    appointment_img,
    Header_Doc,
    tilo,
    icon_rem,
    Banner_Doc,
    header,
    icons,
    GP1,
    FDoc1,
    header_img,
    group_profiles,
    logo,
    hero,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo,
    logobg,
    logobg1,
}

export const specialityData = [
    {
        speciality: 'General physician',
        image: General_physician
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatricians',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
]

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr.Ravi Kumar',
        image: doc1,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        fees: 50,
        address: {
            line1: 'B-101, Sector-10, Cyber City',
            line2: 'Hyderabad'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr.Prisha Singh ',
        image: doc2,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
        fees: 60,
        address: {
            line1: 'B-102, Sector-10, Cyber City',
            line2: 'Hyderabad'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr.Rajesh Kumar',
        image: doc3,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
        fees: 30,
        address: {
            line1: 'B-103, Sector-10, Cyber City',
            line2: 'Hyderabad'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr.Karthik Reddy',
        image: doc4,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
        fees: 40,
        address: {
            line1: 'B-104, Sector-10, Cyber City',
            line2: 'Hyderabad'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Mahika Singh',
        image: doc5,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
        fees: 50,
        address: {
            line1: 'B-105, Sector-10, Cyber City',
            line2: 'Hyderabad'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Kabir Chauhan',
        image: doc6,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
        fees: 50,
        address: {
            line1: 'B-106, Sector-10, Cyber City',
            line2: 'Hyderabad'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr.Aryan Sharma',
        image: doc7,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
        fees: 50,
        address: {
            line1: 'B-107, Sector-10, Cyber City',
            line2: 'Hyderabad'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Christian Leo',
        image: doc8,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
        fees: 60,
        address: {
            line1: 'B-108, Sector-10, Cyber City',
            line2: 'Hyderabad'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Priya Mathur',
        image: doc9,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
        fees: 30,
        address: {
            line1: 'B-109, Sector-10, Cyber City',
            line2: 'Hyderabad'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Aditya Rao',
        image: doc10,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
        fees: 40,
        address: {
            line1: 'B-110, Sector-10, Cyber City',
            line2: 'Hyderabad'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Jasmine Sharma',
        image: doc11,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
        fees: 50,
        address: {
            line1: 'B-111, Sector-10, Cyber City',
            line2: 'Hyderabad'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Boby Thomas',
        image: doc12,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
        fees: 50,
        address: {
            line1: 'B-112, Sector-10, Cyber City',
            line2: 'Hyderabad'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr.Sruthi Khanna',
        image: doc13,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
        fees: 50,
        address: {
            line1: 'B-113, Sector-10, Cyber City',
            line2: 'Hyderabad'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Harshith Kapoor',
        image: doc14,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
        fees: 60,
        address: {
            line1: 'B-114, Sector-10, Cyber City',
            line2: 'Hyderabad'
        }
    },
    {
        _id: 'doc15',
        name: 'Dr.Sneha Patel',
        image: doc15,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
        fees: 30,
        address: {
            line1: 'B-115, Sector-10, Cyber City',
            line2: 'Hyderabad'
        }
    },
    {
        _id: 'doc16',
        name: 'Dr.Surya Yadav',
        image: doc16,
        speciality: 'Gastroenterologist',
        degree: 'MBBS',
        experience: '5 Years',
        about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
        fees: 70,
        address: {
            line1: 'B-116, Sector-10, Cyber City',
            line2: 'Hyderabad'
        }
    },
]