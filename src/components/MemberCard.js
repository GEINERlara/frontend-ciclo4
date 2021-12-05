import LinkedInIcon from '../assets/linkedin-icon.svg'
import './MemberCard.css'

const MemberCard = ({name, img, job}) => {
  return (
    <article className="member-card">
      <div className="member-card__photo">
        <img src={ img.src } alt={ img.alt } 
           className="member-card__photo-img"/>
      </div>
      <div className="member-card__text">
        <h3 className="member-card__name">{ name }</h3>
        <div className="member-card__job">
          <h4 className="member-card__job-name">{ job.name }</h4>
          <a className="member-card__job-link" href={ job.url } >
            <img 
              src={ LinkedInIcon } 
              alt="LinkedIn icon" 
              className="member-card__job-icon"
            />
          </a>
        </div>
      </div>
      
    </article>
  )
}

export default MemberCard
