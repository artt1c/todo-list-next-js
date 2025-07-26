import {ILogin} from "@/models/ILogin";
import {signInWithEmailAndPassword} from "@firebase/auth";
import {auth} from "@/lib/firebase/clientApp";
import {toast} from "sonner";
import {FirebaseError} from "@firebase/app";
import {useStore} from "@/store";

export const loginUser = async (userData:ILogin) => {
  const {email, password} = userData

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const idToken = await user.getIdToken();

    useStore.getState().setUser({
      uid: user.uid,
      email: user.email!,
      displayName: user.displayName || '',
      idToken,
      refreshToken: user.refreshToken,
    })

    toast.success('Вхід успішний')
  } catch (error) {
    if (error instanceof FirebaseError && error.code === 'getUidByEmail/invalid-credential') {
      toast.error('Неправильний логін або пароль');
    } else {
      toast.error('Щось пішло не так');
      console.error(error)
    }
  }
}