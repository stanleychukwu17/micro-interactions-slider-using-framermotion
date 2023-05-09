import { motion } from 'framer-motion';
// import { gsap } from 'gsap';
import { gVariant, buttonVariant } from './Variants';

import './app.scss';

import logo from '../../assets/logo/logo.svg'
import imageBoard from '../../assets/images/board.jpg'

import { AiOutlineMenu } from "react-icons/ai";
import { FaAngleLeft } from "react-icons/fa";
import { HiArrowNarrowDown } from "react-icons/hi";


const App = () => {

    const imageBoardClicked = () => {
        console.log('the image has been clicked on')
    }

    return (
        <div className="AppMain">
            <motion.header variants={gVariant} custom={0} initial='initial' animate='animate' className="logoCvr">
                <div className="logoImg">
                    <img src={logo} alt="" />
                </div>
                <div className="logoMenu">
                    <AiOutlineMenu />
                </div>
            </motion.header>
            <motion.div variants={gVariant} custom={1} initial='initial' animate='animate' className="bckBuy_cvr">
                <div className="bckBuy_btn">
                    <span>
                        <FaAngleLeft />
                    </span>
                    Back
                </div>
                <div className="bckBuy_prc">
                    Buy now $59.99
                </div>
            </motion.div>
            <motion.div variants={gVariant} custom={2} initial='initial' animate='animate' className="midSecCvr">
                <motion.div className="">Boards</motion.div>
                <motion.div className=""><h2 className="">HiFive1 Rev</h2></motion.div>
                <motion.div className="">
                    <p>SiFive HiFive1 is an Arduino-compatible development board featuring the SiFive Freedom E310 (FE310) SoC, making it the best way to prototype and develop RISC-V software. Designed for microcontrollers and edge computing, the FE310 instantiates a SiFive Essential™ E3 Series CPU Core Complex, a high performance 32-bit RV32IMAC core. </p>
                    Additional features include a 16KB L1 Instruction Cache, a 16KB Data SRAM scratchpad, hardware multiply/divide, a debug module, flexible clock generation with on-chip oscillators and PLLs, and a wide variety of peripherals including UARTs, QSPI, PWMs, and timers. Multiple power domains and a low-power standby mode ensure a wide variety of applications can benefit from the FE310. Software development is accelerated with the onboard FTDI FT2232 JTAG debugger connecting over USB to SiFive Freedom Studio, an Eclipse-based IDE. Additionally, your JTAG probe of choice can be connected and used with your favorite debugger and IDE. Freedom Studio is packaged with a prebuilt toolchain and example software projects. Alternatively, the SiFive Freedom Tools download package includes a pre-built toolchain, debugger, and additional command line tools that can be plugged into your own bespoke development environment.
                </motion.div>
            </motion.div>
            <motion.div variants={gVariant} custom={3} initial='initial' animate='animate' className="btnsCvr">
                <motion.div className="btnItm">
                    <motion.button variants={buttonVariant} whileHover='whileHover' className='button'>Buy now $59</motion.button>
                </motion.div>
                <motion.div variants={buttonVariant} whileHover='whileHover' className="dwnBtnCvr button">
                    <HiArrowNarrowDown />
                </motion.div>
            </motion.div>
            <div className="ImgBoard">
                <div className="" onClick={() => imageBoardClicked()}>
                    <img src={imageBoard} alt="" />
                </div>
            </div>
        </div>
    )
}
export default App;