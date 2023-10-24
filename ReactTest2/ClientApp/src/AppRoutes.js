import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { DailyNotes } from "./components/DailyNotes"

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/DailyNotes',
        element: <DailyNotes />
    },
    {
        path: '/counter',
        element: <Counter />
    },
    {
        path: '/fetch-data',
        element: <FetchData />
    }
];

export default AppRoutes;
