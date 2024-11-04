import {Navigate, Route, Routes} from "react-router-dom";
import useUserContext from "../contexts/useUserContext";
import pagesData from "./pagesData.ts";
import { useLocation } from "react-router-dom";

type page = {
    path: string;
    title: string;
    element: JSX.Element;
}

const Router = () => {
    const {user} = useUserContext();
    const pageRoutes = pagesData.map((page:page) => {
        return <Route key={page.title} path={`/${page.path}`} element={page.element} />;
    })
    const location = useLocation();
    const pathCheck = (location.pathname !== "/login" && location.pathname !== "/register")
    if (pathCheck && user === "") {
        return <Navigate to="/login"/>
    }
    return <><Routes>{pageRoutes}</Routes></>
}

export default Router;