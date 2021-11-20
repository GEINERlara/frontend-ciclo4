import { useEffect, useState } from 'react';
import './ProductsFilter.css'

const ProductsFilter = props => {

  const [showOrderBy, setShowOrderBy] = useState(false)
  const [showCategories, setShowCategories] = useState(false)

  // ESTE SE SUPONE QUE LO IMPORTO
  const SearchBox = () => <div className="search-box">Buscar...</div>;

  const categories = [
    {
      name: 'Categoría 1',
      href: '/',
    },
    {
      name: 'Categoría 2',
      href: '/',
    },
    {
      name: 'Categoría 3',
      href: '/',
    },
  ];

  const orderByOptions = [
    {
      name: 'Opción 1',
      value: 'value-1'
    },
    {
      name: 'Opción 2',
      value: 'value-2'
    },
    {
      name: 'Opción 3',
      value: 'value-3'
    },
  ];

  useEffect(() => {
    const updateWindowWidth = () => {
      (window.innerWidth > 960) ? 
        setShowCategories(true) :
        setShowCategories(false)
    }
    updateWindowWidth()
    window.addEventListener('resize', updateWindowWidth)
    return () => { window.removeEventListener('resize', updateWindowWidth) };
  }, [])

  const toggleOrderBy = () => {
    if (!showOrderBy) hideLists()
    setShowOrderBy(!showOrderBy)
  }

  const toggleCategories = () => {
    if (!showCategories) hideLists()
    setShowCategories(!showCategories)
  }

  const hideLists = () => {
    setShowOrderBy(false)
    if (window.innerWidth < 960) setShowCategories(false)
  }

  const ListLabel = ({name, handler}) => {
    return (
      <label 
        className="list-label"
        onClick={ handler }
      >
        <span>{name} </span>
        <i className="list-label__icon">&#x25BC;</i>
      </label>
    )
  }

  const CategoryItems = categories.map((c) => {
    return (
      <li key={ c.name } className="categories-menu__item">
        <a className="categories-menu__link" href={c.href}>{c.name}</a>
      </li>
    );
  });

  const CategoryList = () => {
    if (showCategories) {
      return (
        <ul className="categories-menu__list">
          { CategoryItems }
        </ul>
      );
    }
    else return null;
  } 

  const CategoriesMenu = () => {
    return (
      <nav className="categories-menu">
        <ListLabel 
          name={"Categorías"} 
          handler={ toggleCategories }
        />
        <CategoryList />
      </nav>
    )
  };



  const orderByItems = orderByOptions.map(o => {
    return <li key={o.value} className="order-by__item">{o.name}</li>
  });

  const OrderByList = () => {
    if (showOrderBy) {
      return (
        <ul className="order-by__list">
          { orderByItems }
        </ul>
      )
    } else return null;
  }

  const OrderBy = () => {
    return (
      <div className="order-by">
        <ListLabel 
          name={ "Ordenar: " } 
          handler={ toggleOrderBy }
        />
        <OrderByList />        
      </div>
    )
  }

  return (
    <div className="products-filter">
      <div className="products-filter__container">
        
        <CategoriesMenu />

        <div className="products-filter__box">
          <SearchBox />
          <OrderBy />
        </div>
      </div>
    </div>
  )
}

export default ProductsFilter
