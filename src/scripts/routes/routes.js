import Home from "../views/pages/home";
import About from "../views/pages/about";
import Detail from "../views/pages/detail";

const routes = {
    '/': Home,
    '/about': About,
    '/detail/:id': Detail
}

export default routes;