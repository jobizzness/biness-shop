export const slideUp = (context, duration = 350) => {
    context.animate([
        { 
            transform: 'translate3d(0, 5%, 0)',
            opacity: 0, 
            easing: 'ease-out' 
        },
        { 
            transform: 'translate3d(0, 0, 0)', 
            opacity: 1, 
            easing: 'ease-in' 
        }
    ],
        {
            duration: duration,
        })

    return new Promise((resolve) => setTimeout(() => resolve(), duration))
}

export const slideDown = (context, duration = 300) => {
    context.animate([
        {
            transform: 'translate3d(0, 0%, 0)',
            opacity: 1,
            easing: 'ease-in'
        },
        {
            transform: 'translate3d(0, 5%, 0)',
            opacity: 0,
            easing: 'ease-out'
        }
    ],
        {
            duration: duration,
        })

    return new Promise((resolve) => setTimeout(() => resolve(), duration))
}

export const fadeIn = (context, duration = 350) => {
    context.animate([
        {
            opacity: 0,
            easing: 'ease-out'
        },
        {
            opacity: 1,
            easing: 'ease-in'
        }
    ],
        {
            duration: duration,
        })

    return new Promise((resolve) => setTimeout(() => resolve(), duration))
}

export const fadeOut = (context, duration = 350) => {
    context.animate([
        {
            opacity: 1,
            easing: 'ease-in'
        },
        {
            opacity: 0,
            easing: 'ease-out'
        }
    ],
        {
            duration: duration,
        })

    return new Promise((resolve) => setTimeout(() => resolve(), duration))
}