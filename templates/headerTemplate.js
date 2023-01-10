/**
 * Creates the html template for the header of the site
 * @param {*} config an object containing the test configuration
 * @returns an html template
 */
function headerTemplate(config) {
	if (config.domainName === 'checknewarkinternetspeeds.org') {
		return `
			<header class='header-container'>
				<div class='header-logo' >
					<a class='logo' href="/">
						<img class="logo-img" src="${config.logo}" alt='your community logo' />
					</a>
				</div>
				<ul class="menu">
					<li><a href="/#info">What's This</a></li>
					<li><a href="/history">History</a></li>
					<li class="language-container"></li>
				</ul>
				<button class="hamburger">
					<!-- material icons https://material.io/resources/icons/ -->
					<i class="menuIcon material-icons">menu</i>
					<i class="close-icon material-icons">close</i>
				</button>
				
				<nav class='nav-container'>
					<a href="/#info">What's This</a>
					<a href="/history">History</a>
					<div class="share-buttons-header" id="header-share-buttons">
						<a href="#" target="_blank" class="facebook-btn-header">
							<i class="fa fa-facebook-square icon-gray"></i>
						</a>
						<a href="#" target="_blank" class="twitter-btn-header">
							<i class="fa fa-twitter-square icon-gray"></i>
						</a>
						<a href="#" target="_blank" class="linkedin-btn-header">
							<i class="fa fa-linkedin-square icon-gray"></i>
						</a>
						<a href="#" target="_blank" class="email-btn-header">
							<i class="fas fa-envelope icon-gray"></i>
						</a>
					</div>
					<div class="language-container"></div>
				</nav>
			</header>
		`
	} else {
		return `
			<header class='header-container'>
				<div class='header-logo' >
					<a class='logo' href="/">
						<img class="logo-img" src="${config.logo}" alt='your community logo' />
					</a>
				</div>
				<ul class="menu">
					<li><a href="/#info">What's This</a></li>
					<li><a href="/history">History</a></li>
					<li>				
						<a class='get-your-own-btn' href="https://broadband.money/community-broadband-toolkit" target='_blank' rel='noreferrer'>
							<i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>	
							Get Your Own
						</a>
					</li>
					<li class="language-container"></li>
				</ul>
				<button class="hamburger">
					<!-- material icons https://material.io/resources/icons/ -->
					<i class="menuIcon material-icons">menu</i>
					<i class="close-icon material-icons">close</i>
				</button>
				
				<nav class='nav-container'>
					<a href="/#info">What's This</a>
					<a href="/history">History</a>
					<a class='get-your-own-btn' href="https://broadband.money/community-broadband-toolkit" target='_blank' rel='noreferrer'>
						<i class="fas fa-external-link-alt"></i>
						Get Your Own
					</a>
					<div class="share-buttons-header" id="header-share-buttons">
						<a href="#" target="_blank" class="facebook-btn-header">
							<i class="fa fa-facebook-square icon-gray"></i>
						</a>
						<a href="#" target="_blank" class="twitter-btn-header">
							<i class="fa fa-twitter-square icon-gray"></i>
						</a>
						<a href="#" target="_blank" class="linkedin-btn-header">
							<i class="fa fa-linkedin-square icon-gray"></i>
						</a>
						<a href="#" target="_blank" class="email-btn-header">
							<i class="fas fa-envelope icon-gray"></i>
						</a>
					</div>
					<div class="language-container"></div>
				</nav>
			</header>
		`
	}
  
}

module.exports = headerTemplate
