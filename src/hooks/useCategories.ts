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
  const categoriesRef = collection(db, "categories");

  const getCategories = async () => {
    try {
      const response = await getDocs(query(categoriesRef));
      const docs: Categories[] = response.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Categories, "id">),
      }));
      const normalizedCategory: Omit<Categories, "id"> =
        normalizeCategories(docs);
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
