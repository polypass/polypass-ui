const fs = require("fs");
const path = require("path");

const componentsDir = path.join(__dirname, "..", "react");
console.log("Indexing all .tsx files in: ", componentsDir);

fs.readdir(componentsDir, (err, files) => {
  if (err) throw err;

  const index = files
    .filter((f) => f.endsWith(".tsx"))
    .map((file) => {
      const moduleName = file.replace(".tsx", "");
      return `export * from "./${moduleName}";`;
    })
    .join("\n");

  fs.writeFile(
    path.join(componentsDir, "index.ts"),
    '"use client";\n' + index,
    (err) => {
      if (err) throw err;
      console.log(
        `Generated index.ts with ${index.split("\n").length} exports`
      );
    }
  );
});
