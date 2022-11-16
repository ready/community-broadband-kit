/**
 * Creates the html template for the header of the site
 * @param {*} config an object containing the test configuration
 * @returns an html template
 */
function headerTemplate(config) {
	const logoWidth = config.logoWidth ? config.logoWidth : '80px'

  return `
		<header class='header-container'>
			<a class='logo' href="/">
				<img id="logo-horizontal-blue-img" height="80px" src="${config.logo}" alt='your community logo' />
			</a>
			<ul class="menu">
				<li><a href="/#info">What's This</a></li>
				<li><a href="/history">History</a></li>
				<li>				
					<a class='get-your-own-btn' href="https://broadband.money/community-broadband-toolkit" target='_blank' rel='noreferrer'>
						<i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>	
						Get Your Own
					</a>
				</li>
			</ul>
			<button class="hamburger">
				<!-- material icons https://material.io/resources/icons/ -->
				<i class="menuIcon material-icons">menu</i>
				<i class="close-icon material-icons">close</i>
			</button>
			<div class="column-container">
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
				</nav>
				<div class="language-container" style="justify-content: flex-end;">
					<div id="google_translate_element"></div>
					<script type="text/javascript">
						function googleTranslateElementInit() {
							new google.translate.TranslateElement(
								{pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL},
								'google_translate_element'
							);
						}
					</script>
					<script type="text/javascript" src="https://translate.google.com/translate_a/element.js?
							cb=googleTranslateElementInit">
					</script>
				</div>
			</div>
		</header>
		<script type="module" src="/static/utils/showContent.js"></script>

  `
}

module.exports = headerTemplate
