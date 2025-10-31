import { Storage } from "expo-storage";

export const storeData = async <T,>(key: string, value: T): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await Storage.setItem({ key, value: jsonValue });
    console.log(`✅ Stored data under key: ${key}`);
  } catch (error) {
    console.error("❌ Error storing data:", error);
  }
};

export const getData = async <T,>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await Storage.getItem({ key });
    return jsonValue ? (JSON.parse(jsonValue) as T) : null;
  } catch (error) {
    console.error("❌ Error retrieving data:", error);
    return null;
  }
};

export const removeData = async (key: string): Promise<void> => {
  try {
    await Storage.removeItem({ key });
    console.log(`🗑️ Removed data for key: ${key}`);
  } catch (error) {
    console.error("❌ Error removing data:", error);
  }
};
