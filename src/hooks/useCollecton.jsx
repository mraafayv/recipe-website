import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

export default function useCollecton(c) {
  const [documents, setDocuments] = useState(null);

 

  return { documents };
}
