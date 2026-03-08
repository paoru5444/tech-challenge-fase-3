import { collection, getDocs, query } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase/config";

function normalizeCategories(categories) {
  const obj = categories[0];
  delete obj.id;
  return obj;
}

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const categoriesRef = collection(db, "categories");

  const getCategories = async () => {
    try {
      const response = await getDocs(query(categoriesRef));
      const docs = response.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const normalizedCategory = normalizeCategories(docs);
      setCategories(normalizedCategory);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return {
    categories,
    getCategories,
  };
};

export default useCategories;
