import {
  addDoc,
  collection,
  getDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase.config";

export const collectionRef = collection(db, "blog");
export const que = query(collectionRef, orderBy("timeStamp", "desc"));

export const timeStamp = serverTimestamp();

class FirebaseService {
  addBlog(newBlog) {
    return addDoc(collectionRef, newBlog);
  }

  getBlogDoc(id) {
    const blogDoc = doc(collectionRef, id);
    return getDoc(blogDoc);
  }

  deleteBlog(id) {
    const blogDoc = doc(collectionRef, id);
    return deleteDoc(blogDoc);
  }

  updateBlog(id, blogData) {
    const blogDoc = doc(collectionRef, id);
    return updateDoc(blogDoc, blogData);
  }
}

export default new FirebaseService();
