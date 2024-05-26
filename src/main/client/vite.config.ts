// import {defineConfig} from 'vite'
// import UnoCSS from 'unocss/vite'
// import react from '@vitejs/plugin-react-swc'
//
// // https://vitejs.dev/config/
// export default defineConfig({
//     define: {
//         define: {_global: ({}),}
//     },
//     plugins: [UnoCSS(), react()],
//     base: '/slipstream',
//     build: {
//         outDir: '../resources/slipstream/',
//         emptyOutDir: true,
//     },
//     server: {
//         host: true,
//         port: 8080,
//         proxy: {
//             '/api': {
//                 target: 'http://localhost:8080',
//                 changeOrigin: true,
//                 secure: false,
//                 ws: true,
//                 configure: (proxy, _options) => {
//                     proxy.on('error', (err, _req, _res) => {
//                         console.log('proxy error', err);
//                     });
//                     proxy.on('proxyReq', (proxyReq, req, _res) => {
//                         console.log('Sending Request to the Target:', req.method, req.url);
//                     });
//                     proxy.on('proxyRes', (proxyRes, req, _res) => {
//                         console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
//                     });
//                 },
//             }
//         }
//     }
// });


import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), UnoCSS()],
    base: '/slipstream',
    build: {
        outDir: '../resources/slipstream/',
        emptyOutDir: true,
    }
})
