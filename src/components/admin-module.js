// Import Simpla and OAuth adapter
import Simpla from 'simpla';
//import SimplaNetlify from 'simpla/adapters/netlify';

// Init Simpla
// Simpla.init({

//     // Github repo to store content in
//     repo: 'username/repo',

//     // Adapter to authenticate users with Github
//     auth: new SimplaNetlify({ site: 'mysite' }),

//     // Public URL of your content (optional)
//     source: 'https://mysite.netlify.com'

// });

// Add Simpla to window global for components to access
window.Simpla = Simpla;