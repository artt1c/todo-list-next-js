import {toast} from "sonner";

export const getUidByEmail = async (email: string) => {
  try {
    const response = await fetch('/api/getUidByEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(`Помилка: ${data.message}`);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Помилка при виклику API Route для пошуку UID:", error);
    alert('Помилка мережі або невідома помилка при пошуку користувача.');
    return null;
  }
};