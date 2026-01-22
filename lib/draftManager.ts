// /lib/draftManager.ts
export interface JobData {
  category: string;
  title: string;
  jobDescription: string;
  businessName: string;
  businessType: string;
  daysPerWeek: string;
  salary: string;
  currency: "USD" | "KHR";
  benefits: string[];
  experience: string;
  otherRequirements: string;
  startTime: string;
  endTime: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  responsibilities?: string[];
  skills?: string[];
  province: string; // Change from optional to required
  workplaceType: string; // Change from optional to required
  locationDescription?: string;
  mapLink?: string;
}

export interface Draft {
  id: string;
  data: JobData;
  images: string[]; // base64 strings
  createdAt: number;
  updatedAt: number;
}

export interface ImageCompressionOptions {
  quality?: number;
  maxWidth?: number;
  maxHeight?: number;
}

export class DraftManager {
  static DB_NAME = 'JobDraftsDB';
  static DB_VERSION = 1;
  static STORE_NAME = 'drafts';

  static async initDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      if (!window.indexedDB) {
        reject(new Error("IndexedDB not supported"));
        return;
      }

      const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.STORE_NAME)) {
          const store = db.createObjectStore(this.STORE_NAME, { keyPath: 'id' });
          store.createIndex('createdAt', 'createdAt', { unique: false });
        }
      };
    });
  }

  static async saveDraftLocally(jobData: JobData, images: File[]): Promise<Draft> {
    try {
      const db = await this.initDB();
      const draftId = `draft_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Convert images to base64 for local storage
      const base64Images = await Promise.all(
        images.map(img => this.fileToBase64(img))
      );

      const draft: Draft = {
        id: draftId,
        data: jobData,
        images: base64Images,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.STORE_NAME], 'readwrite');
        const store = transaction.objectStore(this.STORE_NAME);
        const request = store.add(draft);

        request.onsuccess = () => resolve(draft);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error("Error saving draft locally:", error);
      throw error;
    }
  }

  static async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  static async getAllDrafts(): Promise<Draft[]> {
    try {
      const db = await this.initDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.STORE_NAME], 'readonly');
        const store = transaction.objectStore(this.STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error("Error getting drafts:", error);
      return [];
    }
  }

  static async getDraft(draftId: string): Promise<Draft | null> {
    try {
      const db = await this.initDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.STORE_NAME], 'readonly');
        const store = transaction.objectStore(this.STORE_NAME);
        const request = store.get(draftId);

        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error("Error getting draft:", error);
      return null;
    }
  }

  static async deleteDraft(draftId: string): Promise<boolean> {
    try {
      const db = await this.initDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.STORE_NAME], 'readwrite');
        const store = transaction.objectStore(this.STORE_NAME);
        const request = store.delete(draftId);

        request.onsuccess = () => resolve(true);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error("Error deleting draft:", error);
      throw error;
    }
  }

  static async updateDraft(draftId: string, updates: Partial<Omit<Draft, 'id'>>): Promise<Draft> {
    try {
      const db = await this.initDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.STORE_NAME], 'readwrite');
        const store = transaction.objectStore(this.STORE_NAME);
        const getRequest = store.get(draftId);

        getRequest.onsuccess = () => {
          const draft = getRequest.result;
          if (draft) {
            const updatedDraft = { ...draft, ...updates, updatedAt: Date.now() };
            const updateRequest = store.put(updatedDraft);
            updateRequest.onsuccess = () => resolve(updatedDraft);
            updateRequest.onerror = () => reject(updateRequest.error);
          } else {
            reject(new Error("Draft not found"));
          }
        };
        getRequest.onerror = () => reject(getRequest.error);
      });
    } catch (error) {
      console.error("Error updating draft:", error);
      throw error;
    }
  }

  static async compressImages(images: (File | string)[], quality = 0.6): Promise<string[]> {
    return Promise.all(
      images.map(async (file): Promise<string> => {
        // Skip if already base64
        if (typeof file === 'string') return file;
        
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;
            img.onload = () => {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              if (!ctx) {
                resolve('');
                return;
              }
              
              // Calculate new dimensions (max 800px width)
              const maxWidth = 800;
              const scale = Math.min(maxWidth / img.width, 1);
              canvas.width = img.width * scale;
              canvas.height = img.height * scale;
              
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              const compressed = canvas.toDataURL('image/jpeg', quality);
              resolve(compressed);
            };
          };
        });
      })
    );
  }

  static async cleanupOldDrafts(days: number = 30): Promise<{ deleted: number }> {
    try {
      const drafts = await this.getAllDrafts();
      const cutoff = Date.now() - (days * 24 * 60 * 60 * 1000);
      
      const oldDrafts = drafts.filter(draft => draft.createdAt < cutoff);
      
      for (const draft of oldDrafts) {
        await this.deleteDraft(draft.id);
      }
      
      return { deleted: oldDrafts.length };
    } catch (error) {
      console.error("Cleanup error:", error);
      throw error;
    }
  }
}