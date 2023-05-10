import { Variant } from 'framer-motion'

type general = {
    initial?: Variant
    animate?: Variant
}

export const gVariant: general = {
    initial: (custom) => ({
        y: '-30px',
        opacity: 0,
        transition: {
            duration: .5,
            delay: 0.3 * custom,
            ease: 'easeOut'
        }
    }),

    animate: (custom) => ({
        y:0,
        opacity: 1,
        transition: {
            duration: .5,
            delay: 0.3 * custom,
            ease: 'easeOut'
        }
    })
}

export const buttonVariant: general & {whileHover: Variant} = {
    whileHover : {
        scale: 1.1,
        boxShadow: 'none'
    }
}

export const ImageBoardCovered: general & {normal: Variant} = { 
    normal: {
        backgroundColor: 'transparent',
        y: '0px',
        transition: {
            duration: 0.3,
            ease: 'easeOut',
        }
    },
    animate: {
        backgroundColor: '#333',
        y: '-480px',
        transition: {
            duration: 0.3,
            ease: 'easeOut',
        }
    }
}