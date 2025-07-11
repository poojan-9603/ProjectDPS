import admin from 'firebase-admin';
import serviceAccount from '../firebaseAdminApiPrivateKey.js';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin