import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Reference documentation: https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})

/*
//import { defineConfig } from 'vite';
//import react from '@vitejs/plugin-react'; // or vue, etc.

//export default defineConfig({
  //plugins: [react()],
  //server: {
   // proxy: {
      // String shorthand for simple cases
     // '/api': {
       // target: 'http://localhost/solecare1/my-kicks-app',
        //changeOrigin: true,
        //rewrite: (path) => path.replace(/^\/api/, '/api'), 
        // Note: adjust the rewrite if your PHP folder structure 
        // doesn't actually contain a folder named "api"
      //},
    //},
  //},
//});
*/
