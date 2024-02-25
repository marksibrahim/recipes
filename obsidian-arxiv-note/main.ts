// based on https://github.com/chauff/paper-note-filler/
import {
	App,
	Modal,
	Notice,
	Plugin,
	PluginSettingTab,
	Setting,
} from "obsidian";

import { getArxivInfoAsync } from "./downloadarxiv";

const path = require("path");

const downloadFolders: string[] = [
	"/Users/markibrahim/Library/Mobile Documents/3L68KQB4HG~com~readdle~CommonDocuments/Documents/Papers",
	"~/Downloads",
];

const DEFAULT_SETTINGS: PaperNoteFillerPluginSettings = {
	folderLocation: "",
	downloadFolder: downloadFolders[0],
};

//create a string map for all the strings we need
const STRING_MAP: Map<string, string> = new Map([
	[
		"error", "Something went wrong. Check the Obsidian console if the error persists."
	],
	["unsupportedUrl", "This URL is not supported. You tried to enter: "],
	[
		"fileAlreadyExists",
		"Unable to create note. File already exists. Opening existing file.",
	],
	["commandId", "url-to-paper-note"],
	["commandName", "Create paper note from URL."],
	["inputLabel1", "Enter a valid URL."],
	["arXivUrlExample", "https://arxiv.org/abs/0000.00000"],
	["inputPlaceholder", "https://my-url.com"],
	["arxivUrlSuffix", "arXiv:"],
	["settingHeader", "Settings to create paper notes."],
	["settingFolderName", "Folder"],
	["settingFolderDesc", "Folder to create paper notes in."],
	["settingFolderRoot", "(root of the vault)"],
	["settingNoteName", "Note naming"],
	["settingNoteDesc", "Method to name the note."],
	["noticeRetrievingArxiv", "Retrieving paper information from arXiv API."],
]);

function trimString(str: string | null): string {
	if (str == null) return "";

	return str.replace(/\s+/g, " ").trim();
}

interface PaperNoteFillerPluginSettings {
	folderLocation: string;
	downloadFolder: string;
}

export default class PaperNoteFillerPlugin extends Plugin {
	settings: PaperNoteFillerPluginSettings;

	async onload() {
		console.log("Loading Paper Note Filler plugin.");

		await this.loadSettings();

		this.addCommand({
			id: STRING_MAP.get("commandId")!,
			name: STRING_MAP.get("commandName")!,
			callback: () => {
				new urlModal(this.app, this.settings).open();
			},
		});

		this.addSettingTab(new SettingTab(this.app, this));
	}

	onunload() { }

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class urlModal extends Modal {
	settings: PaperNoteFillerPluginSettings;

	constructor(app: App, settings: PaperNoteFillerPluginSettings) {
		super(app);
		this.settings = settings;
	}

	addTextElementToModal(type: keyof HTMLElementTagNameMap, value: string): void {
		const { contentEl } = this;
		contentEl.createEl(type, { text: value });
	}

	addInputElementToModal(type: keyof HTMLElementTagNameMap): any {
		const { contentEl } = this;
		let input = contentEl.createEl(type);
		return input;
	}

	addPropertyToElement(element: HTMLElement, property: string, value: string): void {
		element.setAttribute(property, value);
	}

	getIdentifierFromUrl(url: string): string {
		//if url ends in / remove it
		if (url.endsWith("/"))
			url = url.slice(0, -1);
		return url.split("/").slice(-1)[0];
	}

	async createNote(title: string, url: string, authors: string, year: number) {
		let pathToFile = this.settings.folderLocation + "/" + title + ".md";

		//notification if the file already exists
		if (await this.app.vault.adapter.exists(pathToFile)) {
			new Notice(
				STRING_MAP.get("fileAlreadyExists") + ""
			);
			this.app.workspace.openLinkText(
				pathToFile,
				pathToFile
			);
		} else {
			await this.app.vault
				.create(
					pathToFile,
					"# Problem\n" +
					"# Method\n" +
					"# Results\n" +
					"# Thoughts and limitations" +
					"\n\n"
				)
				.then(() => {
					this.app.workspace.openLinkText(
						pathToFile,
						pathToFile
					);
					const theFile = this.app.vault.getFileByPath(pathToFile);
					this.app.fileManager.processFrontMatter(theFile, (fm) => {
						fm["Summary"] = "";
						fm["Links"] = url;
						fm["Related to"] = "";
						fm["Authors"] = authors;
						fm["Year"] = year.toString();
					});
				})
				.catch((error) => {
					//convert the Notice to a notice with a red background
					new Notice(STRING_MAP.get("error")!);

					console.log(error);
				})
				.finally(() => {
					this.close();
				});
		}
	}

	onOpen() {
		const { contentEl } = this;

		this.addTextElementToModal("h2", STRING_MAP.get("inputLabel1")!);
		this.addTextElementToModal("p", STRING_MAP.get("inputLabel2")!);
		this.addTextElementToModal("p", STRING_MAP.get("arXivUrlExample")!);

		let input = this.addInputElementToModal("input");
		this.addPropertyToElement(input, "type", "search");
		this.addPropertyToElement(input, "placeholder", STRING_MAP.get("inputPlaceholder")!);
		this.addPropertyToElement(input, "minLength", STRING_MAP.get("inputPlaceholder")!);
		this.addPropertyToElement(input, "style", "width: 75%;");

		let extracting = false;

		contentEl.addEventListener("keydown", (event) => {
			if (event.key !== "Enter") return;

			//get the URL from the input field
			let url = input.value.trim().toLowerCase();


			if (!extracting) {
				extracting = true;
				console.log("HTTP request: " + url);

				try {
					getArxivInfoAsync(url, this.settings.downloadFolder)
						.then(result => {
							this.createNote(result[0], url, result[1], result[2]);
						});
				} catch (error) {
					console.error("failed to download or fetch article info")
					console.error(error);
				}

			}
		});
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}

class SettingTab extends PluginSettingTab {
	plugin: PaperNoteFillerPlugin;

	constructor(app: App, plugin: PaperNoteFillerPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl("h2", {
			text: STRING_MAP.get("settings"),
		});

		let folders = this.app.vault
			.getFiles()
			.map((file) => {
				let parts = file.path.split(path.sep);
				parts.pop(); //ignore the filename

				//now return all path combinations
				let res: string[] = [];
				for (let i = 0; i < parts.length; i++) {
					res.push(parts.slice(0, i + 1).join(path.sep));
				}
				return res;
			}
			)
			.flat()
			.filter((folder, index, self) => self.indexOf(folder) === index);

		let folderOptions: Record<string, string> = {};
		folders.forEach((record) => {
			folderOptions[record] = record;
		});

		//also add the root folder
		folderOptions[""] = STRING_MAP.get("settingFolderRoot")!;

		let namingOptions: Record<string, string> = {};
		downloadFolders.forEach((record) => {
			namingOptions[record] = record;
		});

		new Setting(containerEl)
			.setName(STRING_MAP.get("settingFolderName")!)
			.setDesc(STRING_MAP.get("settingFolderDesc")!)
			/* create dropdown menu with all folders currently in the vault */
			.addDropdown((dropdown) =>
				dropdown
					.addOptions(folderOptions)
					.setValue(this.plugin.settings.folderLocation)
					.onChange(async (value) => {
						this.plugin.settings.folderLocation = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName(STRING_MAP.get("settingNoteName")!)
			.setDesc(STRING_MAP.get("settingNoteDesc")!)
			.addDropdown((dropdown) =>
				dropdown
					.addOptions(namingOptions)
					.setValue(this.plugin.settings.downloadFolder)
					.onChange(async (value) => {
						this.plugin.settings.downloadFolder = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
