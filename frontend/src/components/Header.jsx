import React from "react";
import { assets } from "../assets/assets";
import ThemeToggle from "./ThemeToggle";
import Chatbot from "./Chatbot";
import { BiInjection } from "react-icons/bi";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="relative">
      {/* Glassmorphic Top Bar - OUTSIDE */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-[95%] sm:w-[90%] md:w-4/5 bg-white/40 dark:bg-secondary/60 backdrop-blur-md rounded-2xl shadow-lg border border-white/30  px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 z-20">
        <div className="text-lg sm:text-xl md:text-2xl font-semibold text-primary dark:text-white tracking-tight drop-shadow-sm text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-black dark:text-white">
            Visit the trusted Doctors <BiInjection/>
          </div>
        </div>

        <Link
          to="/doctors"
          className="bg-primary text-white dark:bg-black dark:text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md hover:scale-105 transition-all duration-200"
        >
          Book Appointment
        </Link>
      </div>
      {/* Main Header Content */}
      <div className="pt-28">
        <div>
          <ThemeToggle />
        </div>
        <div>
          <Chatbot />
        </div>
        <div className="flex flex-col md:flex-row flex-wrap bg-primary dark:bg-secondary rounded-lg px-6 md:px-10 lg:px-20">
          {/*---------------- left side ---------------- */}
          <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
            <p className="text-3xl dark:text-black md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
              DocEase <br /> Predict. Book. Heal.
            </p>
            <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
              {/* <img className='w-28' src={assets.group_profiles} alt="" /> */}
              <p className="dark:text-black text-lg">
                Book Trusted Doctors Anytime, Anywhere.
                <br className="hidden sm:block" />
                From Symptoms to Solutions — Instantly{" "}
              </p>
            </div>
          </div>
          {/* ---------------Right side------------- */}
          <div className="md:w-1/2 relative">
            <img
              className="w-full md:absolute bottom-0 h-auto rounded-lg"
              src={assets.icons}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
