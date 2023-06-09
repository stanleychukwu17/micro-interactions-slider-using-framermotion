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

export const topSectionVariant: general & { normal: Variant } = {
    normal: {
        y: '0px',
        opacity: 1,
        transition: {
            delay:0.1,
            duration: 0.4
        }
    },
    animate: {
        y: '-100px',
        opacity: 0,
        transition: {
            duration: 0.1
        }
    }
}

export const ImageBoardCovered: general & {normal: Variant} = { 
    normal: {
        backgroundColor: 'transparent',
        y: '0px',
        transition: {
            duration: 0.5,
            ease: 'easeOut',
        }
    },
    animate: {
        backgroundColor: '#333',
        y: '-480px',
        transition: {
            duration: 0.5,
            ease: 'easeOut',
        }
    }
}

export const enlargeHeader: general & {normal: Variant} = { 
    normal: {
        display: 'none',
    },
    animate: {
        display: 'flex',
    }
}