import React, { useState, useEffect } from "react";
import axios from "axios";

const initialForm = {
  name: "",
  category: "",
  area: "",
  searchType: "",
};
let id = 0;
const getId = () => ++id;

function SearchBar() {
  const [form, setForm] = useState(initialForm);
  const [list, setList] = useState([]);


  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  console.log(form);

  const onSubmit = (e) => {
    e.preventDefault();
    if (form.searchType === "name") {
      axios
        .get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${form.name}`
        )
        .then((res) => {
          setList(res.data.meals);
          console.log(res);
        })
        .catch((err) => {
          console.log({ err });
        });
    } else if (form.searchType === "category") {
      axios
        .get("https://www.themealdb.com/api/json/v1/1/categories.php")
        .then((res) => {
          setList(res.data.categories);
        })
        .catch((err) => {
          console.log({ err });
        });
    } else {
      axios
        .get("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
        .then((res) => {
          setList(res.data.meals);
        })
        .catch((err) => {
          console.log({ err });
        });
    }
  };
  console.log(list);

  const categorySearch =(strCategory) => {
      axios 
        .get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${strCategory}`)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log({err})
        })
  }

  // const mealSelection =(id) => {
  //     setSelectMeal(selectMealList.filter(meal => {
  //         return id===meal.id
  //     })
  //      )
  //      console.log('working')
  // }
  // console.log (selectMeal)

  return (
    <div className="search-component">
      <form onSubmit={onSubmit}>
        <label>
          SEARCH TYPE
          <select
            name="searchType"
            type="search-type"
            onChange={onChange}
            value={form.searchType}
          >
            <option value=""> -Select- </option>
            <option value="name">Name</option>
            <option value="category">Category</option>
            <option value="area">Area</option>
          </select>
        </label>
        <div>
          {form.searchType === "name" && (
            <label>
              <input
                name="name"
                type="text"
                placeholder="search by name"
                onChange={onChange}
                value={form.name}
              />
            </label>
          )}
        </div>
        <button> SUBMIT </button>
      </form>

      <ul>
        {form.searchType === "name" &&
          list.map((meal) => <li key={meal.idMeal}>{meal.strMeal}</li>)}
        {form.searchType === "category" &&
          list.map((cat) => <li onClick = {categorySearch(cat.strCategory)} key={cat.idCategory}>{cat.strCategory}</li>)}
        {form.searchType === "area" &&
          list.map((place) => <li key={getId}> {place.strArea}</li>)}
      </ul>
    </div>
  );
}

export default SearchBar;
