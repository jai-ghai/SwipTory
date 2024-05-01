import React from "react";
import styles from "./Categories.module.css";
import worldImg from "../../../assets/images/categories/world.png";
import indiaImg from "../../../assets/images/categories/India.png";
import fruitsImg from "../../../assets/images/categories/fruits.png";
import medicalImg from "../../../assets/images/categories/Medical.png";
import allImg from "../../../assets/images/categories/All.png";

const Categories = ({ handleCategoryClick, categories, selectedCategory }) => {
  const images = {
    world: worldImg,
    india: indiaImg,
    fruits: fruitsImg,
    medical: medicalImg,
    all: allImg,
  };

  return (
    <div className={styles.categories}>
      <div
        className={`${styles.category} ${
          "All" === selectedCategory ? styles.categorySelected : ""
        }`}
        onClick={() => handleCategoryClick("All")}
        style={{ backgroundImage: `url(${images.all})` }}
      >
        <h3 className={styles.categoryName}>All</h3>
      </div>

      {categories &&
        categories.map((category, index) => (
          <div
            className={`${styles.category} ${
              category === selectedCategory ? styles.categorySelected : ""
            }`}
            key={index}
            onClick={() => handleCategoryClick(category)}
            style={{ backgroundImage: `url(${images[category]})` }}
          >
            <h3 className={styles.categoryName}>{category}</h3>
          </div>
        ))}
    </div>
  );
};

export default Categories;
