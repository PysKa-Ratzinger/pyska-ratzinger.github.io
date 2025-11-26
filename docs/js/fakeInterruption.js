let snackbarElem = document.getElementById("interruptionSnackbar");
let findOutBtn = document.getElementById("interruptionFindOutBtn");

function createSpinnerElement() {
	let result = document.createElement("div");
	result.classList.add("center");
	let spinner = document.createElement("div");
	spinner.classList.add("lds-spinner");

	for (let i = 0; i < 12; i++) {
		spinner.append(document.createElement("div"));
	}

	result.append(spinner);
	return result;
}

function delay(time_in_ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, time_in_ms);
	});
}

function showSnackBar() {
	snackbarElem.classList.add("show");
}

function hideSnackBar() {
	snackbarElem.classList.remove("show");
}

let spinner = createSpinnerElement();

function applyInterruption(contentElement, details) {
	let actualContent = [...contentElement.children];

	let result = Promise.resolve()
		.then(() => delay(details.fakeLoadingDelay))
		.then(() => { contentElement.replaceChildren(spinner) })
		.then(() => delay(details.initialSpinnerDelay))
		.then(() => { contentElement.replaceChildren() });

	for (let i = 0; i < actualContent.length; i++) {
		result = result
			.then(() => delay(details.inlineChildrenDelay))
			.then(() => contentElement.append(actualContent[i]));
	}

	return result;
}

function applyInterruptions(allContent, details) {
	let snackbar = Promise.resolve()
		.then(() => delay(details.snackBarDelay))
		.then(() => showSnackBar());

	let interruptions = allContent.map((content) => {
		return applyInterruption(content, details);
	});

	return Promise.all([snackbar, ...interruptions])
		.then(() => hideSnackBar());
}

let details = {
	fakeLoadingDelay: 300,
	initialSpinnerDelay: 9200,
	inlineChildrenDelay: 20,
	snackBarDelay: 3000,
};

const content1 = document.getElementById("article_title")
const content2 = document.getElementById("article_content")

findOutBtn.onclick = () => {
	alert("After studying the design of the best webpages, it has come to my attention that most of these pages are slow. Therefore, slowness must be a requirement for a good webpage. Which is why I specifically introduced delayed loading of every post. I've even let the user see the actual content for a little bit before \"loading\" it, to make it as clear as possible that this is intentional, and this was a website written by an expert.");
}

applyInterruptions([content1, content2], details);
