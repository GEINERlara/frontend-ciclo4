import { Link } from "react-router-dom"
import "./BreadCrumbs.css"

const BreadCrumbs = ({links = []}) => {

  return (
    <div className="bread-crumbs">
      <div className="bread-crumbs__container">
        {
          links.map((link, idx) => {
            return (
              <span key={ idx }>
                <Link 
                  to={ link.path }
                  className="bread-crumbs__link"
                >
                  { link.name }
                </Link>
                { idx + 1 < links.length ? <span className="bread-crumbs__separator">/</span> : ''}
              </span>
            )
          })
        }
      </div>
    </div>
  )
}
  
export default BreadCrumbs
