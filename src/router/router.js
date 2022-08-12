import { createRouter, createWebHashHistory } from "vue-router";
import isAuthenticatedGuard from "./auth-guard";

const routes = [
    {
        path: '/',
        redirect: '/pokemon'
    },
    // Pokemon Layout
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
    // DBZ Layout
    {
        path: '/dbz',
        name: 'dbz',
        eforeEnter: [ isAuthenticatedGuard ],
        component: () => import(
            /* webpackChunkName: "DragonBallLayout" */
            '@/modules/dbz/layouts/DragonBallLayout'
        ),
        children: [
            {
                path: 'character',
                name: 'dbz-characters',
                beforeEnter: [ isAuthenticatedGuard ],
                component: () => import(
                    /* webpackChunkName: "CharactersPage" */
                    '@/modules/dbz/pages/CharactersPage'
                )
            },
            {
                path: 'about',
                name: 'dbz-about',
                beforeEnter: [ isAuthenticatedGuard ],
                component: () => import(
                    /* webpackChunkName: "AboutPage" */
                    '@/modules/dbz/pages/AboutPage'
                )
            },
            {
                path: '',
                redirect: { name: 'dbz-about' }
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

//* Gard Global - Sync
// router.beforeEach((to, from, next) => {
//     console.log({to, from, next});

//     const random = Math.random() * 100;
//     if(random > 50) {
//         console.log('autenticado');
//         next()
//     } else {
//         console.log(random, 'bloqueado por el script');
//         next({ name: 'pokemon-home'})
//     }
// })

//* Gard Global - Async
// const canAccess = () => {
//     return new Promise( resolve => {
//         const random = Math.random() * 100;
//         if(random > 50) {
//             console.log('Autenticado - canAcess');
//             resolve(true)
//         } else {
//             console.log(random, 'bloqueado por el script - canAccess');
//             resolve(false)
//         }
//     })
// }

// router.beforeEach(async (to, from, next)  => {
//     const authorized = await canAccess()
//     authorized 
//         ? next() 
//         : next({ name: 'pokemon-home'})
// })

export default router;
