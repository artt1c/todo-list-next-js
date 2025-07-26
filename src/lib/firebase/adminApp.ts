'use server'
import admin from 'firebase-admin';

interface FirebaseAdminAppParams {
  projectId: string;
  clientEmail: string;
  storageBucket: string;
  privateKey: string;
}

function formatPrivateKay(key:string) {
  return key.replace(/\\n/g, '\n');
}

function createFirebaseAdminApp(params:FirebaseAdminAppParams) {
  const privateKey = formatPrivateKay(params.privateKey);

  if(admin.apps.length > 0){
    return admin.app();
  }

  const cert = admin.credential.cert({
    projectId: params.projectId,
    clientEmail: params.clientEmail,
    privateKey
  })

  return admin.initializeApp({
    credential: cert,
    projectId: params.projectId,
    storageBucket: params.storageBucket,
  })
}

export async function initAdmin() {
  const params = {
    projectId: process.env.NEXT_PUBLIC_FIFEBASE_PROJECT_ID as string,
    clientEmail: process.env.FIFEBASE_CLIENT_EMAIL as string,
    storageBucket: process.env.NEXT_PUBLIC_FIFEBASE_STORAGE_BUCKET as string,
    privateKey: process.env.FIFEBASE_PRIVATE_KEY as string,
  }

  return createFirebaseAdminApp(params)
}
