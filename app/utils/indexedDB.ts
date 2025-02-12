import { openDB } from "idb";

const DB_NAME = "conferenceTicketDB";
const STORE_NAME = "formData";

// Initialize IndexedDB
type FormData = {
  fullName: string;
  email: string;
  avatarUrl: string;
  details: string;
};

export async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
}

// Save form data to IndexedDB
export async function saveFormData(data: FormData) {
  const db = await initDB();
  await db.put(STORE_NAME, data, "userForm");
}

// Get form data from IndexedDB
export async function getFormData(): Promise<FormData | undefined> {
  const db = await initDB();
  return db.get(STORE_NAME, "userForm");
}

// Clear stored form data
export async function clearFormData() {
  const db = await initDB();
  await db.delete(STORE_NAME, "userForm");
}
