import { createContext, useEffect, useState } from "react";
import { fakeFetch } from "../fakeFetch";

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [foodList, setFoodList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState({
    search: "",
    category: [],
    sort: ""
  });

  const handleSearch = (searchedItem) =>
    setFilter({ ...filter, search: searchedItem });

  const handleCheckBox = (event) => {
    const checkedCategory = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setFilter({ ...filter, category: [...filter.category, checkedCategory] });
    } else {
      setFilter({
        ...filter,
        category: filter.category.filter((type) => type !== checkedCategory)
      });
    }
  };

  const handleRadio = (sortChoice) =>
    setFilter({ ...filter, sort: sortChoice });

  const applyFilters = () => {
    let filteredData = [...foodList];
    if (filter.search.length > 0) {
      filteredData = filteredData.filter(({ name }) =>
        name.toLowerCase().includes(filter.search.toLowerCase())
      );
    }
    if (filter.category.length > 0) {
      filteredData = filteredData.filter((food) =>
        filter.category.every((category) => food[category])
      );
    }
    if (filter.sort === "LTH") {
      filteredData = [...filteredData].sort((a, b) => a.price - b.price);
    } else if (filter.sort === "HTL") {
      filteredData = [...filteredData].sort((a, b) => b.price - a.price);
    }
    return filteredData;
  };

  const filteredMenu = applyFilters();

  const fetchFood = async () => {
    try {
      setIsLoading(true);
      const {
        status,
        data: { menu }
      } = await fakeFetch("https://example.com/api/menu");
      setIsLoading(false);
      if (status === 200) {
        setFoodList(menu);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchFood();
  }, []);

  return (
    <MenuContext.Provider
      value={{
        foodList,
        filteredMenu,
        isLoading,
        handleCheckBox,
        handleSearch,
        handleRadio
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
