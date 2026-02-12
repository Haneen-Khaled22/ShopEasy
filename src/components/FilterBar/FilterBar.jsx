import { useState } from "react";

const FilterBar = ({ filters, handleChange, brands, categories }) => {
  return (
    <div className="p-4 rounded-md mt-8 max-w-4xl bg-gray-50 text-center ">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <select
          name="category"
          className="filter-select"
          value={filters.category}
          onChange={handleChange}
        >
          <option value="">Category</option>
          {categories.map((category, index) => (
            <option
            className="cursor-pointer"
            key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select name="brand"
        className="filter-select"
        value={filters.brand} onChange={handleChange}>
          <option value="">Brand</option>
          {brands.map((brand, index) => (
            <option key={index} value={brand}>
              {brand}
            </option>
          ))}
        </select>

        <select
          name="price"
          value={filters.price}
          onChange={handleChange}
          className="filter-select"
        >
          <option value="">Price</option>
          <option value="low">Low → High</option>
          <option value="high">High → Low</option>
        </select>

        <select
          name="sort"
          value={filters.sort}
          onChange={handleChange}
          className="filter-select"
        >
          <option value="">Sort By</option>
          <option value="newest">Newest</option>
          <option value="rating">Highest Rating</option>

          <option value="discount">Biggest Discount</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
