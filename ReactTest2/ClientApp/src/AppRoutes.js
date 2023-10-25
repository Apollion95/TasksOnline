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
];

export default AppRoutes;
