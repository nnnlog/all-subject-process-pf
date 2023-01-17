const fs = require("fs");

if (fs.existsSync(`${__dirname}/final`)) {
	fs.rmSync(`${__dirname}/final`, {
		recursive: true,
	});
}
fs.mkdirSync(`${__dirname}/final`);

for (let file of fs.readdirSync(`${__dirname}/res`)) {
	let [year, semester] = file.slice("res_".length, -5).split("-");
	semester = semester.replace(/ /g, "");
	console.log(year, semester, "start");

	let json = JSON.parse(fs.readFileSync(`${__dirname}/res/${file}`, "utf-8"));

	let pf = [];
	for (let num in json) {
		if (json[num] === null) continue;
		if (json[num].syllabus === null) continue;
		if (json[num].syllabus.SCALE_TEXT === undefined) continue;
		if (json[num].syllabus.SCALE_TEXT.indexOf("Pass") !== -1) pf.push(num);
	}

	console.log(year, semester, "end");
	fs.writeFile(`${__dirname}/final/pf_${year}-${semester}.json`, JSON.stringify(pf), () => {});
}
