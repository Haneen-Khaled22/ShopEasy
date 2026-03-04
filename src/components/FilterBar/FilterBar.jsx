import { useState } from "react";
import { useTranslation } from "react-i18next";

const FilterBar = ({ filters, handleChange, brands, categories }) => {

  const {t} = useTranslation()
  return (
    <div className="p-4 rounded-md mt-8 max-w-4xl bg-gray-50 dark:bg-black/20 dark:text-black text-center ">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <select
          name="category"
          className="filter-select"
          value={filters.category}
          onChange={handleChange}
        >
          <option value="">{t("Category")}</option>
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
          <option value="">{t("Brand")}</option>
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
          <option value="">{t("Price")}</option>
          <option value="low">{t("Low → High")}</option>
          <option value="high">{t("High → Low")}</option>
        </select>

        <select
          name="sort"
          value={filters.sort}
          onChange={handleChange}
          className="filter-select"
        >
          <option value="">{t("Sort By")}</option>
          <option value="newest">{t("Newest")}</option>
          <option value="rating">{t("Highest Rating")}</option>
          <option value="discount">{t("Biggest Discount")}</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;