import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './ProductsFilter.css'
import SearchBox from './SearchBox';

const ProductsFilter = () => {

  // TODO: onClickOutside para listas desplegables.

  const [categories, setCategories] = useState([])
  const [showOrderBy, setShowOrderBy] = useState(false)
  const [showCategories, setShowCategories] = useState(false)
  const [isPageWide, setIsPageWide] = useState(Boolean)
  const [searchBoxIsDeployed, setSearchBoxIsDeployed] = useState(false)
  
  const data = useSelector(state => state.data)
  
  useEffect(() => {
    if (data?.categories) setCategories(data.categories) 
  }, [data])


  const orderByOptions = [
    {
      name: 'Menor precio',
      value: 'value-1'
    },
    {
      name: 'Mayor precio',
      value: 'value-2'
    },
    {
      name: 'Alfabeticamente',
      value: 'value-3'
    },
  ];

  // sets isPageWide
  useEffect(() => {
    const updateWindowWidth = () => {
      (window.innerWidth > 960) ? 
        setIsPageWide(true) :
        setIsPageWide(false)
    }; 
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

  const setSearchBoxDeployed = (value) => {
    setSearchBoxIsDeployed(value)
  }

  const handleOrderBy = (e, value) => {
    console.log('Order by', value)
    hideLists()
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
        <Link 
          className="categories-menu__link" 
          to={ "/categorias/" + c.slug}>
            {c.name}
        </Link>
      </li>
    );
  });

  const CategoryList = () => {
    if (showCategories || isPageWide) {
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
    return (
      <li 
        key={o.value} 
        className="order-by__item"
        onClick={ (e) => { handleOrderBy(e, o.value) } }
      >
        {o.name}
      </li>
    )
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
        {
          searchBoxIsDeployed && !isPageWide ?
          ''
          :
          <CategoriesMenu />
        }
        <div className="products-filter__box">
          <SearchBox 
            isPageWide={ isPageWide } 
            setSearchBoxDeployed={ setSearchBoxDeployed } 
          />
          {
            searchBoxIsDeployed && !isPageWide ?
            ''
            :
            <OrderBy />
          }
        </div>
      </div>
    </div>
  )
}

export default ProductsFilter
