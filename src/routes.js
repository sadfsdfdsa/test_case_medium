import Index from "@/views/Index";
import Login from "@/views/Login";
import Post from "@/views/Post";

const routes = [
    {
        path: "/",
        component: Index,
        name: "indexPage",
        meta: {}
    },
    {
        path: "/login",
        component: Login,
        name: "loginPage",
        meta: {}
    },
    {
        path: "/post",
        component: Post,
        name: "postPage",
        meta: {}
    },
];

export default routes;
