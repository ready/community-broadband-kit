const styleTemplate = require('./styleTemplate')

/**
 * Creates the head html template
 * @param {*} config an object containing the test configuration
 * @param {*} ogImageSrc the ogImage
 * @returns an html template
 */
function headTemplate(config, ogImageSrc) {
    const style = styleTemplate(config)
    const favicon = config.favicon ? config.favicon : '/static/assets/favicon.ico'
    const headerTitle = config.headerTitle ? config.headerTitle : `${config.communityName} Community Toolkit: Free Broadband Tests`
    const headerDescription = config.headerDescription ? config.headerDescription : `Gather ${config.communityName}'s broadband test results to build empirical proof for BEAD's eligibility and challenge process. Find out the unserved and underserved status of broadband serviceable locations in ${config.communityName}'s area.`
    const ogImage = ogImageSrc ? ogImageSrc : 'https://storage.googleapis.com/boss-public-assets-prod/measure-broadband.png'
    const ogTitle = config.ogTitle ? config.ogTitle : `Be a champion of your community. Help ${config.communityName} by taking a free internet speed test.`
    const ogDescription = config.ogDescription ? config.ogDescription : `This quick and easy test helps you and your neighbors in ${config.communityName} win grants to deliver you better broadband service.`

    return `
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover">
            <meta name="theme-color" content="#000000">
            ${style}
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
            <link rel="stylesheet" href="/static/index.css">
            <link rel="icon" type="image/x-icon" href="${favicon}">
            <!-- SEO -->
            <title>${headerTitle}</title>
            <meta name="description" content="${headerDescription}">
            <meta name='keywords' content='free, broadband test, empirical data, performance test, eligibility, challenge process, unserved, served, underserved, broadband, state broadband office list, iija, ntia, ntia/iija, treasury cpf, cpf, award grants, win broadband grants, community, community toolkit, BEAD, NOFO, broadband grants, communities, guides, subsidiarities, census block groups, ${config.communityName}' />
            <meta property="og:title" content="${ogTitle}">
            <meta property="og:description" content="${ogDescription}">    
            <meta property="og:image" content="${ogImage}">
            <meta property="twitter:title" content="${ogTitle}">
            <meta name='twitter:card' content='summary_large_image' />
            <meta property='twitter:description' content="${ogDescription}" />
            <meta property="twitter:image" content="${ogImage}">
            <!-- SEO -->
        </head>
    `
}

module.exports = headTemplate