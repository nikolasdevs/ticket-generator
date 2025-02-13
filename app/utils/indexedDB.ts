import { openDB } from "idb";

const DB_NAME = "conferenceTicketDB";
const STORE_NAME = "formData";
const TICKET_STORE = "ticketData";

type UserFormData = {
  fullName: string;
  email: string;
  avatarUrl: string;
  details: string;
};

type TicketData = {
  accessType: string;
  attendeeCount: number;
};

export async function initDB() {
  return openDB(DB_NAME, 2, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
      if (!db.objectStoreNames.contains(TICKET_STORE)) {
        db.createObjectStore(TICKET_STORE);
      }
    },
  });
}

export async function saveFormData(data: UserFormData) {
  try {
    const db = await initDB();
    await db.put(STORE_NAME, data, "userForm");
  } catch (error) {
    console.error("Error saving user form data:", error);
  }
}

export async function saveTicketData(ticketData: TicketData) {
  try {
    const db = await initDB();
    await db.put(TICKET_STORE, ticketData, "ticketSelection");
  } catch (error) {
    console.error("Error saving ticket data:", error);
  }
}

export async function getFormData(): Promise<UserFormData | undefined> {
  try {
    const db = await initDB();
    return await db.get(STORE_NAME, "userForm");
  } catch (error) {
    console.error("Error retrieving form data:", error);
    return undefined;
  }
}

export async function getTicketData(): Promise<TicketData | undefined> {
  try {
    const db = await initDB();
    return await db.get(TICKET_STORE, "ticketSelection");
  } catch (error) {
    console.error("Error retrieving ticket data:", error);
    return undefined;
  }
}

export async function clearFormData() {
  try {
    const db = await initDB();
    await db.delete(STORE_NAME, "userForm");
    console.log("User form data cleared.");
  } catch (error) {
    console.error("Error clearing form data:", error);
  }
}

// **Clear ticket data**
export async function clearTicketData() {
  try {
    const db = await initDB();
    await db.delete(TICKET_STORE, "ticketSelection");
    console.log("Ticket selection data cleared.");
  } catch (error) {
    console.error("Error clearing ticket data:", error);
  }
}
