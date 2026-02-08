import { useState } from "react";

const FilterBar = () => {
  const [filters, setFilters] = useState({
    category: "",
    color: "",
    brand: "",
    price: "",
    sort: "",
  });

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white p-4 rounded-md mt-8 max-w-2xl ">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="filter-select"
        >
          <option value="">Category</option>
          <option value="furniture">Furniture</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
        </select>

        

        <select
          name="brand"
          value={filters.brand}
          onChange={handleChange}
          className="filter-select"
        >
          <option value="">Brand</option>
          <option value="ikea">IKEA</option>
          <option value="samsung">Samsung</option>
          <option value="apple">Apple</option>
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
          <option value="popular">Most Popular</option>
        </select>

      </div>
    </div>
  );
};

export default FilterBar;
