import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import queryString from "query-string";

import  './SearchBox.css'

const SearchBox = ({ isPageWide, setSearchBoxDeployed = () => {} }) => {

    const navigate = useNavigate()
    
    const [isCollapsed, setIsCollapsed] = useState(Boolean)
    const [inputValue, setInputValue] = useState("")
    
    const location = useLocation()
    const { q = '' } = queryString.parse(location.search)

    useEffect(() => {
        if ((!isPageWide) && (!inputValue)) {
            setIsCollapsed(true)
        }
        if ((isPageWide) || (inputValue)) {
            setIsCollapsed(false)
        }
    }, [isPageWide, inputValue])

    useEffect(() => {
        if (q.length > 0) { 
            setInputValue(q)
            setIsCollapsed(false)
            document.getElementById('input-search-box').focus()
        } else {
            setInputValue('')
        }
    }, [q])

    useEffect(() => {
        if (!isCollapsed) {
            setSearchBoxDeployed(true)
        } else {
            setSearchBoxDeployed(false)
        }
    }, [isCollapsed])

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
        let path = (e.target.value.length > 0) ? '/productos?q=' : '/productos'
        navigate(`${path}${e.target.value}`)
        document.getElementById('input-search-box').focus()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const hideInput = (e) => {
        if (isPageWide === false) { 
            setIsCollapsed(true)
        }
    }

    const showInput = async () => {
        await setIsCollapsed(false)
        let input = document.getElementById('input-search-box')
        input.focus()
    }

    const handleSearchButtonClick = (e) => {
        if ( isCollapsed ) {
            showInput()
        }
    }

  return (
    <div 
        className={ "search-box" + ( isCollapsed ? " search-box--collapsed" : "" ) }
    >
        <form className="search-box__form" onSubmit={ handleSubmit }>
            <input 
                id="input-search-box"
                type="text"
                className="search-box__input"
                placeholder="Buscar..."
                name="search"
                value={inputValue}
                onChange={(e)=>handleInputChange(e)}
                onBlur={ hideInput }
            />
            <button
                className="search-box__button"
                type={ isCollapsed ? 'button' : 'submit' }
                onClick={ handleSearchButtonClick }
            >
                <div className="search-box__button-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24">
                        <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                    </svg>
                </div>
                    
            </button>
        </form>
    </div>
  )
}

export default SearchBox
