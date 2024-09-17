type Router = {
    link: string;
    name: string;
}

export const router: Router[] = [
    {
        link: '/schedules',
        name: 'Schedules'
    },
    {
        link: '/events',
        name: 'Events'
    },
    {
        link: '/activities',
        name: 'Activities'
    },
    {
        link: '/about',
        name: 'About'
    }
]