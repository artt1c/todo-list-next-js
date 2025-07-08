import {IRegister} from "@/models/IRegister";
import {createUserWithEmailAndPassword, updateProfile} from "@firebase/auth";
import {auth} from "@/lib/firebase/clientApp";
import {toast} from "sonner";
import {useStore} from "@/store";



export const registrationUser = async (userRegisterData:IRegister) => {
  const {username, email, password} = userRegisterData;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const idToken = await user.getIdToken();

    await updateProfile(user, {
      displayName: username,
    });

    useStore.getState().setUser({
      uid: user.uid,
      email: user.email!,
      displayName: user.displayName || '',
      idToken,
      refreshToken: user.refreshToken,
    })

    toast.success('Реєстрація успішна');
    console.log(user);
  } catch (error) {
    toast.error('Щось пішло не так');
    console.error(error);
  }
}