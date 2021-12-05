import React from 'react'
import SiteHeader from "../components/SiteHeader"
import PageTitle from '../components/PageTitle'
import MemberCard from '../components/MemberCard'
import SiteFooter from "../components/SiteFooter"
import './Nosotros.css'

const Nosotros = props => {

  const members = [
    {
      name: 'Juan Peréz 1',
      img: {
        src: '/images/nosotros/mono.jpg',
        alt: 'Juan Perez trabajando.'
      },
      job: {
        name: 'Desarrollador Web Full Stack',
        url: '/'
      }
    },
    {
      name: 'Juan Peréz 2',
      img: {
        src: '/images/nosotros/mono.jpg',
        alt: 'Juan Perez trabajando.'
      },
      job: {
        name: 'Desarrollador Web Full Stack',
        url: '/'
      }
    },
    {
      name: 'Juan Peréz 3',
      img: {
        src: '/images/nosotros/mono.jpg',
        alt: 'Juan Perez trabajando.'
      },
      job: {
        name: 'Desarrollador Web Full Stack',
        url: '/'
      }
    },
    {
      name: 'Juan Peréz 4',
      img: {
        src: '/images/nosotros/mono.jpg',
        alt: 'Juan Perez trabajando.'
      },
      job: {
        name: 'Desarrollador Web Full Stack',
        url: '/'
      }
    },
    {
      name: 'Juan Peréz 5',
      img: {
        src: '/images/nosotros/mono.jpg',
        alt: 'Juan Perez trabajando.'
      },
      job: {
        name: 'Desarrollador Web Full Stack',
        url: '/'
      }
    },
  ]

  const AboutSection = () => {
    return (
      <section className="about-section box">
        <div className="box__container">
          <h2 className="about-section__title">QUIÉNES SOMOS</h2>
          <img 
            className="about-section__img"
            src="/images/nosotros/monos.jpg" 
            alt="Quiénes somos" 
          />
          <p className="about-section__text">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
          <p className="about-section__text">The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
        </div>
      </section>
    )
  }

  const MembersList = () => {

    return (
      <section className="team box">
        <div className="team__container box__container" >
          <h2 className="team__title">EQUIPO</h2>
          <div className="members-list" >
            {
              members.map(member => {
                return (
                  <MemberCard 
                    key={ member.name }
                    name={ member.name }
                    img={ member.img }
                    job={ member.job }
                  />
                )
              })
            }
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <SiteHeader />
      <PageTitle title="NOSOTROS"/>
      <AboutSection />
      <MembersList />
      <SiteFooter />
    </>
  )
}

export default Nosotros
