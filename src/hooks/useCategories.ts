import { collection, getDocs, query } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase/config";

type Categories = {
  finances: string;
  food: string;
  gifts: string;
  health: string;
  housing: string;
  incomes: string;
  leisure: string;
  pets: string;
  transport: string;
  id?: string;
};

function normalizeCategories(categories: Categories[]): Categories {
  const category = categories[0];
  delete category.id;
  return category;
}

const useCategories = () => {
  const [categories, setCategories] = useState<Omit<Categories, "id">[] | {}>(
    {},
  );
  const [loading, setLoading] = useState(false);

  const categoriesRef = collection(db, "categories");

  const getCategories = async () => {
    try {
      setLoading(true);
      const response = await getDocs(query(categoriesRef));
      const docs: Categories[] = response.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Categories, "id">),
      }));
      const normalizedCategory: Omit<Categories, "id"> =
        normalizeCategories(docs);
      setCategories(normalizedCategory);
      setLoading(false);
    } catch (error) {
      console.log("error: ", error);
      setLoading(false);
    }
  };

  return {
    categories,
    getCategories,
    loading,
  };
};

export default useCategories;
