import Home from "../views/pages/home";
import About from "../views/pages/about";
import Detail from "../views/pages/detail";
import Favourite from "../views/pages/favourite";

const routes = {
    '/': Home,
    '/about': About,
    '/detail/:id': Detail,
    '/favourite': Favourite,
}

export default routes;