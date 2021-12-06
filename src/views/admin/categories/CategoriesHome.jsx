import React, { useEffect, useState } from "react";

import { CategoriesCard } from '../../../components/admin/CategoriesCard'

import { getCategories } from "../../../api";
import { setDashboardTitle } from "../../../actions/ui";
import { useDispatch } from "react-redux";

const Home = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch( setDashboardTitle('Categorías') )
  }, [])


  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getFromBkend = async () => {
      let resp = await getCategories();
      resp = await resp.json()
      setCategories(resp)
    };

    getFromBkend()
  }, []);

  return (
    <div>
      <CategoriesCard
        type="categoria"
        titles={['Nombre', 'Slug']}
        rows={categories}
      ></CategoriesCard>
    </div>
  );
};

export default Home;
