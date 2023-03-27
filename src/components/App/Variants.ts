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