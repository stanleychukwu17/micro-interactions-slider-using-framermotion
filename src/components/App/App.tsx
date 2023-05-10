import { useCallback, useEffect, useRef } from 'react';
import { motion, useMotionValue, useAnimationControls } from 'framer-motion';
import { gsap } from 'gsap';
import { gVariant, buttonVariant, ImageBoardCovered } from './Variants';

// imports the stylesheet for this component
import './app.scss';

// importing of the assets that will be used in this component
import logo from '../../assets/logo/logo.svg'
import imageBoard from '../../assets/images/b1.png'

// react-icons to be used in this component
import { AiOutlineMenu } from "react-icons/ai";
import { FaAngleLeft } from "react-icons/fa";
import { HiArrowNarrowDown } from "react-icons/hi";


const App = () => {
    const updatedWidth = useRef<boolean>(false)
    const xDrag = useMotionValue(0)
    const dragTrigger = useAnimationControls()



    const imageBoardClicked = useCallback(() => {
        const imgBoardInside = document.querySelector('div.ImgBoardInside img') as Element
        const cssObj = window.getComputedStyle(imgBoardInside, null);
        const imgBoardWidth = Number(cssObj.getPropertyValue("width").replace(/[^0-9.]/ig, ''));

        // updates the width of the image cover
        if (imgBoardWidth > 0) {
            gsap.set('div.ImgBoardInside', {width: `${imgBoardWidth + 10}px`})
        } else {
            setTimeout( () => { imageBoardClicked() }, 500 )
        }
    }, [])

    useEffect(() => {
        imageBoardClicked()
        return () => { }
    }, [imageBoardClicked])



    
    const expandTheImageBoard = useCallback(async (wch:'intro'|'out') => {
        if (wch === 'intro') {
            dragTrigger.start('animate')
            gsap.set('div.ImgBoardOutside', { height:'100vh' })
            
            // gsap.to('div.top_section', {marginTop:'-500px', opacity:0, duration:1})
            // gsap.set('div.noteOnDrag', {display: 'none'})
        } else {
            // gsap.to('div.top_section', {marginTop:'0px', opacity:1, duration:1.5})
            // gsap.set('div.noteOnDrag', {display: 'block'})
            await dragTrigger.start('normal')
            gsap.set('div.ImgBoardOutside', { height:'400px'})

            
        }
    }, [dragTrigger])

    useEffect(() => {
        const unSubscribe = xDrag.onChange(latest => {
            console.log('boss is changing', {latest})

            if (latest > -10) {
                expandTheImageBoard('out')
                imageBoardClicked()
                console.log('remove')
            } else if (latest <= -10) {

                expandTheImageBoard('intro')
                imageBoardClicked()
            }
        })
    
        return () => { unSubscribe() }
    }, [xDrag, expandTheImageBoard])



    return (
        <div className="AppMain">
            <div className="top_section">
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
            </div>
            <motion.div
                variants={ImageBoardCovered}
                animate={dragTrigger}
                className="ImgBoardOutside"
            >
                <motion.div
                    className="ImgBoardInside"
                    drag='x'
                    dragConstraints={{left:-900, right:0}}
                    dragElastic={false}
                    // onDrag={}
                    style={{x:xDrag}}
                >
                    <img src={imageBoard} alt="" />
                </motion.div>
            </motion.div>
            <div className="noteOnDrag">
                <span><FaAngleLeft /></span> Drag to enlarge
            </div>
        </div>
    )
}
export default App;