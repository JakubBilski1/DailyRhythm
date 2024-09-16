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
        link: '/plans',
        name: 'Plans'
    },
    {
        link: '/about',
        name: 'About'
    }
]