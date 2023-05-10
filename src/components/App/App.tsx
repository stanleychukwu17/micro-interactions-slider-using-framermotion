import { useCallback, useEffect, useRef } from 'react';
import { motion, useMotionValue, useAnimationControls } from 'framer-motion';
import { gsap } from 'gsap';
import { gVariant, buttonVariant, ImageBoardCovered, enlargeHeader } from './Variants';

// imports the stylesheet for this component
import './app.scss';

// importing of the assets that will be used in this component
import logo from '../../assets/logo/logo.svg'
import logo2 from '../../assets/logo/logo2.svg'
import imageBoard from '../../assets/images/b1.png'

// react-icons to be used in this component
import { AiOutlineMenu } from "react-icons/ai";
import { FaAngleLeft } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { HiArrowNarrowDown } from "react-icons/hi";


const App = () => {
    const expandedImageView = useRef<boolean>(false)
    const current_distance_scrolled_from_the_top = useRef<number>(0)
    const xDrag = useMotionValue(0)
    const dragTrigger = useAnimationControls()



    const resize_the_image_board = useCallback(() => {
        const imgBoardInside = document.querySelector('div.ImgBoardInside img') as Element
        const cssObj = window.getComputedStyle(imgBoardInside, null);
        const imgBoardWidth = Number(cssObj.getPropertyValue("width").replace(/[^0-9.]/ig, ''));

        // updates the width of the image cover
        if (imgBoardWidth > 0) {
            gsap.set('div.ImgBoardInside', {width: `${imgBoardWidth + 10}px`})
        } else {
            setTimeout( () => { resize_the_image_board() }, 500 )
        }
    }, [])

    useEffect(() => {
        resize_the_image_board()
        return () => { }
    }, [resize_the_image_board])



    const scroll_body_back_to_its_last_scroll = useCallback(() => {
        let lastTop = current_distance_scrolled_from_the_top.current;
        document.body.scrollTop = document.documentElement.scrollTop = lastTop
    }, [])

    const expandTheImageBoard = useCallback(async (wch:'intro'|'out') => {
        if (wch === 'intro') {
            dragTrigger.start('animate')
            gsap.set('div.ImgBoardOutside', { height:'100vh' })

            current_distance_scrolled_from_the_top.current = document.documentElement.scrollTop
            document.querySelector('body')?.classList.add('stopOverFlow')
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        } else {
            await dragTrigger.start('normal')
            gsap.set('div.ImgBoardOutside', { height:'400px'})

            document.querySelector('body')?.classList.remove('stopOverFlow')
            scroll_body_back_to_its_last_scroll()
        }
    }, [dragTrigger])

    useEffect(() => {
        const unSubscribe = xDrag.onChange(latest => {

            if (latest > -10) {
                expandTheImageBoard('out')
                resize_the_image_board()
                expandedImageView.current = false;
            } else if (latest <= -10) {
                if (expandedImageView.current) {
                    return
                }

                expandTheImageBoard('intro')
                resize_the_image_board()
                expandedImageView.current = true;
            }
        })
    
        return () => { unSubscribe() }
    }, [xDrag, expandTheImageBoard])



    return (
        <div className="AppMain">
            <motion.div className="top_section">
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
            </motion.div>
            <motion.div
                variants={ImageBoardCovered}
                animate={dragTrigger}
                className="ImgBoardOutside"
            >
                <motion.div variants={enlargeHeader} animate={dragTrigger} className="EnlargeHeader">
                    <div className="logoImg">
                        <img src={logo2} alt="" />
                    </div>
                    <div className="EnlargeClose" onClick={() => { expandTheImageBoard('out'); xDrag.stop(); xDrag.set(0) }}>
                        <GrClose color='#fff' />
                    </div>
                </motion.div>
                <motion.div
                    className="ImgBoardInside"
                    drag='x'
                    dragConstraints={{left:-1000, right:0}}
                    dragElastic={false}
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