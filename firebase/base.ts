import {
  QueryDocumentSnapshot,
  QuerySnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc
} from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'
import { db, storage } from './config'
import { orderBy } from 'lodash'

// Create a new document
const create = async (collectionRef: any, data: object) => {
  const createdAt = new Date().toISOString()
  const newData = { ...data, createdAt }
  const docRef = await addDoc(collectionRef, newData)
  return docRef.id
}
const createOrReplace = async (collectionRef, data) => {
  try {
    const createdAt = new Date().toISOString()
    const newData = { createdAt, ...data }
    const docRef = doc(collectionRef)
    await setDoc(docRef, newData)
    return docRef.id
  } catch (error) {
    console.log(error)
    throw error
  }
}
// Read a single document
const read = async (collectionName: string, id: string) => {
  const docRef = doc(collection(db, collectionName), id)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return { id: docSnap.id, ...(docSnap.data() as any) }
  } else {
    return null
  }
}
// Find all documents in a collection that match a specific condition
export type Condition<T> = [string, T[keyof T] | T[keyof T][]]

const findAll = async <T>(collectionRef: any, conditions: Condition<T>[]): Promise<T[]> => {
  const querySnapshot: QuerySnapshot<T> = await getDocs(collectionRef)
  const data: T[] = []
  querySnapshot.forEach((doc: QueryDocumentSnapshot<T>) => {
    const docData = doc.data()
    if (doc.exists() && docData) {
      // Check if snapshot exists and contains data
      const item: T = { ...docData, id: doc.id } // Include document ID as 'id' property in returned data
      if (
        conditions.every((condition) => {
          const [key, value] = condition
          return Array.isArray(value) ? value.includes(item[key]) : item[key] === (value as any)
        })
      ) {
        data.push(item)
      }
    }
  })
  return data
}
const deleteItemByField = async (collectionName, fieldName, fieldValue) => {
  try {
    const collectionRef = collection(db, collectionName)
    const querySnapshot = await getDocs(collectionRef)

    querySnapshot.forEach((doc) => {
      const docData = doc.data()
      if (docData[fieldName] === fieldValue) {
        deleteDoc(doc.ref)
        console.log('Document deleted successfully.')
      }
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}
// Read all documents in a collection
const readAll = async (collectionRef) => {
  const q = query(collectionRef, orderBy('createdAt', 'asc') as any)
  const querySnapshot = await getDocs(q)
  const documents = []
  querySnapshot.forEach((doc) => {
    documents.push({ id: doc.id, ...(doc.data() as any) })
  })
  return documents
}
// Update a document
const update = async (collectionRef: any, id: string, data: object) => {
  await updateDoc(doc(collectionRef, id), data)
}

const deleteItem = async (collectionName: string, id: string) => {
  try {
    await deleteDoc(doc(db, collectionName, id))
    console.log('Document deleted successfully.')
  } catch (error) {
    console.log(error)
    throw error
  }
}
const addImage = async (file: File, path: string): Promise<string> => {
  const storageRef = ref(storage, path)
  const snapshot = await uploadBytes(storageRef, file)
  return snapshot.metadata.fullPath
}

export {
  create,
  deleteItem,
  read,
  readAll,
  update,
  addImage,
  findAll,
  deleteItemByField,
  createOrReplace
}
