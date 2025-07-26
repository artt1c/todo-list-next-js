import {initAdmin} from "@/lib/firebase/adminApp";
import {FirebaseError} from "@firebase/app";
import {NextRequest, NextResponse} from "next/server";

const admin = await initAdmin();

export async function POST(req: NextRequest) {

  const { email } = await req.json();

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return NextResponse.json({ message: 'Недійсний email. Будь ласка, вкажіть коректний email.' }, {status: 400})
  }

  try {
    const userRecord = await admin.auth().getUserByEmail(email);

    return NextResponse.json({
      uid: userRecord.uid,
      email: userRecord.email,
    }, {status: 200})
  } catch (e) {
    if (e instanceof FirebaseError) {
      if (e.code === 'getUidByEmail/user-not-found') {
        return NextResponse.json({message: `Користувача з email '${email}' не знайдено.` }, {status: 404})
      }
      console.error('Помилка пошуку UID за email на сервері:', e);
    }
    return NextResponse.json({ message: 'Не вдалося отримати UID. Спробуйте пізніше.' }, { status: 500})
  }
}