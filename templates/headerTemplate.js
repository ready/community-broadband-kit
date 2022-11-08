/**
 * Creates the html template for the header of the site
 * @param {*} config an object containing the test configuration
 * @returns an html template
 */
function headerTemplate(config) {
  return `
  	<style>
		  .get-your-own-btn {
				font-weight: 700;
				cursor: pointer;
			}
			.get-your-own-btn img{
				position: relative;
				margin-top: 16px !important;
				margin-right: 2px !important;
			}
			.iconGray{
				font-size: 24px;
				color: var(--color-gray-7) !important;
			}
			.share-buttons-header a{
				margin: 4px !important;
			}
			.iconGray:hover {
				color: var(--color-button-hover) !important;
			}



			.menuItem {
				display: block;
				margin: 2rem 4rem;
				font-size: 1.8rem;
				color: var(--color-gray-1)
				text-decoration: none;
			}
			
			.menuItem:hover {
				text-decoration: underline;
			}
			
			.hamburger {
				position: absolute;
				z-index: 100;
				top: 34px;
				right: 14px;
				padding: 4px;
				border: var(--color-blue-9) solid 1px;
				border-radius: 4px;
				background: white;
				cursor: pointer;
			}
			
			.closeIcon {
				display: none;
			}
			
			.menu {
				position: absolute;
				transform: translateY(-100%);
				transition: transform 0.2s;
				top: -5px;
				right: 0;
				z-index: 99;
				padding: 24px;
				background-color: var(--color-gray-0);
				border-radius: 8px;
				transition: all .3s ease-out;
				box-shadow: var(--shadow-01);
				list-style: none;
			}
			
			.showMenu {
				transform: translateY(0);
			}
			@media only screen and (min-width: 852px) {
				.hamburger {
					display: none;
				}
			}
			@media only screen and (max-width: 852px) {
				.nav-container {
					display: none;
				}

				.header-logo {
					margin: 0
				}
			}
		</style>
		<header class='header-container'>
			<div class='header-logo' >
					<a class='logo' href="/">
						<img class="logo-img" height="80px" src="${config.logo}" alt='your community logo' />
					</a>
			</div>
			<ul class="menu">
				<li><a href="/#info">What's This</a></li>
				<li><a href="/history">History</a></li>
				<li>				
					<a class='get-your-own-btn' href="https://broadband.money/community-broadband-toolkit" target='_blank' rel='noreferrer'>
						<img id="arrow-external-link" width="14" src="/static/assets/icons/arrow-link.svg" alt='arrow external link' />	
						Get Your Own
					</a>
				</li>
			</ul>
			<button class="hamburger">
				<!-- material icons https://material.io/resources/icons/ -->
				<i class="menuIcon material-icons">menu</i>
				<i class="closeIcon material-icons">close</i>
			</button>
			<nav class='nav-container'>
				<a href="/#info">What's This</a>
				<a href="/history">History</a>
				<a class='get-your-own-btn' href="https://broadband.money/community-broadband-toolkit" target='_blank' rel='noreferrer'>
					<img id="arrow-external-link" width="14" src="/static/assets/icons/arrow-link.svg" alt='arrow external link' />	
					Get Your Own
				</a>
				<div class="share-buttons-header" id="header-share-buttons">
					<a href="#" target="_blank" class="facebook-btn-header">
						<i class="fa fa-facebook-square iconGray"></i>
					</a>
					<a href="#" target="_blank" class="twitter-btn-header">
						<i class="fa fa-twitter-square iconGray"></i>
					</a>
					<a href="#" target="_blank" class="linkedin-btn-header">
						<i class="fa fa-linkedin-square iconGray"></i>
					</a>
					<a href="#" target="_blank" class="email-btn-header">
						<i class="fas fa-envelope iconGray"></i>
					</a>
        </div>
			</nav>
		</header>
  `
}

module.exports = headerTemplate
