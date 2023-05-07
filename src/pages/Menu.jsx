import { useContext } from "react";
import { FoodCard } from "../components/FoodCard";
import { MenuContext } from "../contexts/MenuContext";

export const Menu = () => {
  const {
    isLoading,
    filteredMenu,
    handleSearch,
    handleCheckBox,
    handleRadio
  } = useContext(MenuContext);

  return (
    <div className="menu">
      <div className="filter-div">
        <h2>Filters:</h2>
        <input
          placeholder="Search food here"
          type="text"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <div className="filters">
          <label>
            <input
              type="checkbox"
              value="is_vegetarian"
              onChange={(e) => handleCheckBox(e)}
            />
            Veg
          </label>
          <label>
            <input
              type="checkbox"
              value="is_spicy"
              onChange={(e) => handleCheckBox(e)}
            />
            Spicy
          </label>
          <label>
            <input
              type="radio"
              value="LTH"
              name="priceSort"
              onChange={(e) => handleRadio(e.target.value)}
            />
            Sort (price) Low to High
          </label>
          <label>
            <input
              type="radio"
              value="HTL"
              name="priceSort"
              onChange={(e) => handleRadio(e.target.value)}
            />
            Sort (price) High to Low
          </label>
        </div>
        <h2>Menu</h2>
      </div>
      {isLoading ? (
        <p>Loading Menu...</p>
      ) : (
        <ul>
          {filteredMenu.map((food) => (
            <FoodCard foodData={food} key={food.id} />
          ))}
        </ul>
      )}
    </div>
  );
};
