import './app.scss';
// import { motion } from 'framer-motion';
// import { gsap } from 'gsap';

import logo from '../../assets/logo/logo.svg'
import { AiOutlineMenu } from "react-icons/ai";

console.log(logo)
const App = () => {

    return (
        <div className="AppMain">
            <div className="logoCvr">
                <div className="logoImg">
                    <img src={logo} alt="" />
                </div>
                <div className="">
                    <AiOutlineMenu />
                </div>
            </div>
        </div>
    )
}
export default App;