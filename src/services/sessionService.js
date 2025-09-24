// src/services/sessionService.js
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";

export async function saveSession(topic, startTime, endTime) {
  try {
    await addDoc(collection(db, "sessions"), {
      topic,
      startTime,
      endTime,
      userId: auth.currentUser.uid
    });
    console.log("Oturum kaydedildi");
  } catch (err) {
    console.error(err);
  }
}

export async function getTodaySessions() {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const q = query(
    collection(db, "sessions"),
    where("userId", "==", auth.currentUser.uid),
    where("startTime", ">=", todayStart.getTime())
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => doc.data());
}
