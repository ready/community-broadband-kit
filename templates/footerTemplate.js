/**
 * Creates the html template for the footer of the site
 * @param {*} config an object containing the test configuration
 * @returns an html template
 */
function footerTemplate(config) {
	if (config.domainName === 'checknewarkinternetspeeds.org') {
		return `
			<footer class="section-container center-content" style="background-color: var(--color-footer)">
					<div class='section-top'>
						<div class='footer-section'>
							<div class="bottom-logo">
								<a class="logo" href="/">
									<img class="logo-img" src="${config.logo}" alt='your community logo' />
								</a>
							</div>
						</div>
						<div class='footer-section'>
							<div class='social-link'>
								<a href="#" target="_blank" class="facebook-btn-header">
									<i class="fa fa-facebook-square gray"></i>
								</a>
								<a href="#" target="_blank" class="twitter-btn-header">
									<i class="fa fa-twitter-square gray"></i>
								</a>
								<a href="#" target="_blank" class="linkedin-btn-header">
									<i class="fa fa-linkedin-square gray"></i>
								</a>
								<a href="#" target="_blank" class="email-btn-header">
									<i class="fas fa-envelope gray"></i>
								</a>
							</div>
						</div>
					</div>
			</footer>
		`
	} else {
		return `
			<footer class="section-container center-content" style="background-color: var(--color-footer)">
					<div class='section-top'>
						<div class='footer-section'>
							<h2 class="section-heading white" style="text-align: left">Stay tuned for updates about our broadband grant journey.</h2>
							<p class='section-description white'>Want to stay informed about our progress? Enter your email here. We won't share it with third parties.</p>
							<div class='button-container'>
								<input
									type='email'
									id='email'
									class='input-email'
									placeholder='Your email'
									aria-label="your email"
								/>
								<button class='button-get-alert' onclick="window.sendEmailSubscription()">Get alerts</button>
							</div>
						</div>
						<div class='footer-section'>
							<ul>
								<li><a href="https://broadband.money/community-broadband-toolkit" target='_blank' rel='noreferrer'>Get Your Community's Broadband Kit</a></li>
								<li><a href="https://broadband.money/contact-us" target='_blank' rel='noreferrer'>Contact Us</a></li>
								<li><a href="https://discuss.broadband.money/home" target='_blank' rel='noreferrer'>Join the Discussion</a></li>
								<li><a href="https://broadband.money/broadband-grant-terms/broadband-audit" target='_blank' rel='noreferrer'>What are Broadband Audits?</a></li>
							</ul>
							<div class='social-link'>
								<a href="#" target="_blank" class="facebook-btn-header">
									<i class="fa fa-facebook-square gray"></i>
								</a>
								<a href="#" target="_blank" class="twitter-btn-header">
									<i class="fa fa-twitter-square gray"></i>
								</a>
								<a href="#" target="_blank" class="linkedin-btn-header">
									<i class="fa fa-linkedin-square gray"></i>
								</a>
								<a href="#" target="_blank" class="email-btn-header">
									<i class="fas fa-envelope gray"></i>
								</a>
							</div>
						</div>
					</div>
					<div class='section-bottom white'>
						<div class="bottom-logo">
							<a class="logo" href="/">
								<img class="logo-img" src="${config.logo}" alt='your community logo' />
							</a>
						</div>
						<p>
							<span>Built with&nbsp;&#9825;&nbsp;by <a href="https://broadband.money/" target='_blank' rel='noreferrer' style="text-decoration:none">Broadband.money</a></span>
						</p>
					</div>
			</footer>
		`
	}
}

module.exports = footerTemplate
