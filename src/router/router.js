import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: '/',
        redirect: '/pokemon'
    },
    {
        path: '/pokemon',
        name: 'pokemon',
        component: () => import(
            /* webpackChunkName: "PokemonLayout" */
            '@/modules/pokemon/layouts/PokemonLayout'
        ),
        children: [
            {
                path: 'home',
                name: 'pokemon-home',
                component: () => import(
                    /* webpackChunkName: "ListPage" */
                    '@/modules/pokemon/pages/ListPage'
                )
            },
            {
                path: "about",
                name: 'pokemon-about',
                component: () => import(
                    /* webpackChunkName: "AboutPage" */
                    '@/modules/pokemon/pages/AboutPage'
                )
            },
            {
                path: "pokemonId/:id",
                name: 'pokemon-id',
                component: () => import(
                    /* webpackChunkName: "PokemonPage" */
                    '@/modules/pokemon/pages/PokemonPage'
                ),
                props: ( route ) => {
                    const id = Number(route.params.id);
                    return { id: isNaN(id) ? 1 : id }
                }
            },
            {
                path: '',
                redirect: { name: 'pokemon-about' }
            }
        ]
    },
    {
        path: "/:pathMath(.*)*",
        component: () => import(
            /* webpackChunkName: "NoPageFound" */
            '@/modules/shared/pages/NoPageFound'
        ),
        // redirect: '/home'
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
