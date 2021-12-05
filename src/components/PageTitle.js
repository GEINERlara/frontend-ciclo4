import "./PageTitle.css"

const PageTitle = ({title}) => {
    return (
      <div className="page-title">
        <h1 className="page-title__text">
        {title}
        </h1>
      </div>
    )
  }
  
  export default PageTitle