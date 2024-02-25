// // Based on https://github.com/j3soon/arxiv-utils/blob/master/chrome/content.js

// // Regular expressions for parsing arXiv IDs from URLs.
// // Ref: https://info.arxiv.org/help/arxiv_identifier_for_services.html#urls-for-standard-arxiv-functions
const ID_REGEXP_REPLACE = [
	[/^.*:\/\/(?:export\.|browse\.)?arxiv\.org\/abs\/(\S*?)\/*(\?.*?)?(\#.*?)?$/, "$1", "Abstract"],
	[/^.*:\/\/(?:export\.|browse\.)?arxiv\.org\/pdf\/(\S*?)(?:\.pdf)?\/*(\?.*?)?(\#.*?)?$/, "$1", "PDF"],
	[/^.*:\/\/(?:export\.|browse\.)?arxiv\.org\/ftp\/(?:arxiv\/|([^\/]*\/))papers\/.*?([^\/]*?)\.pdf(\?.*?)?(\#.*?)?$/, "$1$2", "PDF"],
	[/^.*:\/\/ar5iv\.labs\.arxiv\.org\/html\/(\S*?)\/*(\?.*?)?(\#.*?)?$/, "$1", "HTML5"],
];
var DOMParser = require('xmldom').DOMParser;
const LOG_PREFIX = "[arXiv-utils]";
const path = require("path");
const download = require('download');


// // Return the id parsed from the url.
function getId(url) {
	for (const [regexp, replacement, pageType] of ID_REGEXP_REPLACE) {
		if (regexp.test(url))
			return url.replace(regexp, replacement);
	}
	return null;
}
// // Return the page type according to the URL.
function getPageType(url) {
	for (const [regexp, replacement, pageType] of ID_REGEXP_REPLACE) {
		if (regexp.test(url))
			return pageType;
	}
	return null;
}
// Get article information through arXiv API asynchronously.
// Ref: https://info.arxiv.org/help/api/user-manual.html#31-calling-the-api
async function parseArticleInfoAsync(id, pageType) {
	console.log(LOG_PREFIX, "Retrieving title through ArXiv API request...");
	const response = await fetch(`https://export.arxiv.org/api/query?id_list=${id}`);
	if (!response.ok) {
		console.error(LOG_PREFIX, "Error: ArXiv API request failed.");
		return;
	}
	const xmlDoc = await response.text();
	const parsedXML = new DOMParser().parseFromString(xmlDoc, 'text/xml');
	const entry = parsedXML.getElementsByTagName("entry")[0];
	// title[0] is query string, title[1] is paper name.
	const title = entry.getElementsByTagName("title")[0].textContent;
	// Long titles will be split into multiple lines, with all lines except the first one starting with two spaces.
	const escapedTitle = title.replace("\n", "").replace("  ", " ").replace(":", " -");
	// TODO: May need to escape special characters in title?
	const newTitle = `${escapedTitle} | ${pageType}`;
	var authorElement = entry.getElementsByTagName("name");
	const firstAuthor = authorElement[0].textContent;

	const authorsArray = [];
	let i = 0;
	while (i < authorElement.length) {
		authorsArray.push(authorElement[i].textContent);
		i++;

	};
	const authors = authorsArray.join(", ");
	const publishedYear = entry.getElementsByTagName("published")[0].textContent.split('-')[0];
	const updatedYear = entry.getElementsByTagName("updated")[0].textContent.split('-')[0];
	return {
		escapedTitle,
		newTitle,
		firstAuthor,
		authors,
		publishedYear,
		updatedYear,
	}
}


export async function getArxivInfoAsync(url, downloadFolder = "/Users/markibrahim/Desktop/tmp/arxiv-test/") {
	console.log("Starting to run");
	const id = getId(url);

	if (!id) {
		console.error("Error: Failed to get paper ID, aborted.");
		return;
	}
	const pageType = getPageType(url);

	// get article info
	var apiUrl = "http://export.arxiv.org/api/query?search_query=id:";
	apiUrl = apiUrl + id;
	const articleInfo = await parseArticleInfoAsync(id, pageType);
	console.log("successfully found article info for " + articleInfo.escapedTitle);

	// download pdf
	const downloadUrl = "https://arxiv.org/pdf/" + id + ".pdf";
	const downloadPath = path.join(downloadFolder, articleInfo.escapedTitle + " - " + articleInfo.publishedYear + ".pdf");
	download(downloadUrl, downloadPath)
		.then(() => {
			console.log("successfully downloaded article to " + downloadPath);
		})
		.catch(error => {
			if (error.code === 'EEXIST') {
				console.log("pdf found, skipping download.");
			}
			else {
				console.error("failed to download pdf");
				console.error(error);
			}
		}
		)

	return [articleInfo.escapedTitle, articleInfo.authors, articleInfo.publishedYear];

}

// Execute main logic.
// getArxivInfoAsync("https://arxiv.org/abs/2305.04160");
