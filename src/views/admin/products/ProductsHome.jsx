import React, { useRef } from "react";
import { useState } from "react";
import { ProductsTable } from "../../../components/admin/ProductsTable";
import { getProducts } from "../../../api";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDashboardTitle } from '../../../actions/ui'

const ProductsHome = ({ children }) => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch( setDashboardTitle('Productos') )
  }, [])

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([])

  const data = useSelector(state => state.data)

  useEffect(() => {
    if (data.categories) setCategories(data.categories)
  }, [data])

  useEffect(() => {
    getProducts()
      .then(resp => resp.json() )
      .then(data => setProducts(data))
  }, []);

  const setProductsCategories = async () => {
    let localProducts = [...products]

    await localProducts.forEach(product => {
      product.category = data.categories.find(category => {
        return product.category_id === category._id
      })
    })
    setProducts(localProducts)
    // console.log(products)
    // console.log(categories)
  }

  const setDataRef = useRef(true)
  useEffect(() => {
    if ((products.length > 0) && (categories.length > 0) && setDataRef.current) {
      setDataRef.current = false
      setProductsCategories()
    }
  }, [products, categories])

  const columns = ["Status", "Categorias", "Nombre", "Precio", "", ""];
  return (
    <div style={{ color: "red" }}>
      <ProductsTable titles={columns} rows={products} />
    </div>
  );
}
export default ProductsHome;
