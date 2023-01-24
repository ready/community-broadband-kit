import React from 'react'
import styles from './InfoSection.module.css'

const InfoSection = ({section}) => {
	const getInfoSteps = (section) => {
		switch (section) {
		  case 'welcome':
			return {
			  img: <img src={''} alt={''} style={{ height:'409px', width:'272px'}}/>,
			  alt: "",
				h2Title:'Welcome',
				descriptionRight:
				[
					'Fill in text here',
				],
				descriptionLeft:[],
				imgDes:(
					<>
						<p className={styles.governorName}></p>
						<em className={styles.governor}></em>
					</>
				),
				backgroundColor: 'var(--ms-dark)'
			}
			case 'how-does-it-work':
				return {
					img: <img className={`${styles.whyIcon}`} src={''} alt={'how does it work image '} style={{ height:'auto', maxWidth:'568px'}}/>,
					h2Title:'How does it work?',
					h2Subtitle:'ISP Monopolies don\'t want us to have freedom of choice.',
					descriptionRight:
					[
						'Congress set aside $65 billion to help improve broadband in communities like ours. Our community is applying, but large ISPs will fight us.',
						'By taking the broadband test, you help our community build the empirical proof needed in order to prove eligibility for broadband grants, and to defend against incumbents who will challenge.',
					],
					descriptionLeft:[],
					imgDes:(
						<></>
					),
					backgroundColor: 'var(--ms-blue)'
				}
			case 'tips':
				return {
					img:null,
					h2Title:'Tips for great results',
					h2Subtitle:null,
					descriptionRight:
					[
						'For best results, please make sure to take the test once per day for 7 days.',
						'If you are able to do so, please connect your device to the Internet using an Ethernet cable plugged into the modem or router where you receive the primary connection from your provider.',
						"Please make sure that no one in your household is streaming videos or gaming while you take this test.",
					],
					descriptionLeft:
					[
						'If you are not able to connect by Ethernet, please bring your device as close as safely possible to the Wi-Fi enabled router. If you have multiple routers, please use the one where you receive the primary connection from your provider.',
						"If you are connected to school or work, please turn off your VPN during this test. If you don't know what a VPN is, then you are ready to take the test."
					],
					imgDes:(
						<></>
					),
					backgroundColor: 'var(--ms-light-blue)'
			}
			case 'survey-tips':
				return {
					img:null,
					h2Title:'Survey Tips',
					h2Subtitle:'It is helpful to know the answers to the following questions before taking the survey:',
					descriptionLeft:
					[
						'A survey is conducted while speed tests run as a way to gather qualitative data in addition to the quantitative data gathered from the speed tests.',
						'Each time a test is taken, a new set of survey questions are asked. Answer as many questions as possible during the duration of the test.',
					  'Keep in mind it takes an average of 3-4 tests to be run in order to finish the entire survey. To help us in getting the qualitative data we need to build the strongest possible case, consider taking the test repeatedly until all survey questions have been answered.',
					],
					descriptionRight:[
						'How much do you pay for internet per month?',
						'What download and upload speeds are you paying for? Is this the best speed offered by your provider? This may require you to look at your provider’s service plan that you are using.',
						'What type of internet do you have? For example, do you have Cable or Fiber?'
					],
					imgDes:(
						<></>
					),
					backgroundColor: 'var(--ms-dark)'
				}
		  default:
		}
	  }
	  const steps = getInfoSteps(section)

  return (
    <section className={`${styles.sectionContainer} ${styles.centerContent}` } style={{ backgroundColor: steps?.backgroundColor,minHeight: '100vh' }}>
			<div  className={`${styles.section} ${styles.columnContainer} ${styles.centerContent}`} style={{ width: '100%' }}>
				<h2 className={`${styles.sectionHeading} ${styles.white} ${styles[section]}`}  style={{alignSelf:`${section.includes(['tips'])?'center':'flex-start'}`}}>{steps.h2Title}</h2>
				<div  className={`${styles.rowContainer}`}>
					<div className={`${['welcome','how-does-it-work'].includes(section)?styles.wideSectionLeft:styles.sectionLeft}`}>
						<h2 className={`${styles.sectionSubheading} ${styles.white}`} >{steps.h2Subtitle}</h2>
						{steps.descriptionRight.map((des,index)=>{
							return <p key={index} className={`${styles.sectionDescription } ${styles.white} ${styles[section]}`} >{des}</p>
						})
						}
					</div>
					<div className={`${['welcome'].includes(section)?styles.shortSectionRight:styles.sectionRight} ${styles.white}`}>
						{steps.img}
						<div>
							{steps.imgDes}
							{steps.descriptionLeft.map((des,index)=>{
							return <p key={index} className={`${styles.sectionDescription } ${styles.white} ${styles[section]}`} >{des}</p>
						})
						}
						</div>
					</div>
				</div>
			</div>
    </section>
  )
}

export default InfoSection