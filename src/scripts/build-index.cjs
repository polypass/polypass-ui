const fs = require("fs");
const path = require("path");

const componentsDir = path.join(__dirname, "..", "react");
console.log("Recursively indexing all .tsx files in:", componentsDir);

function getAllTSXFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllTSXFiles(filePath));
    } else if (file.endsWith(".tsx") && !file.endsWith(".stories.tsx")) {
      results.push(filePath);
    }
  });
  return results;
}

const tsxFiles = getAllTSXFiles(componentsDir);
const index = tsxFiles
  .map((filePath) => {
    // Get relative path from componentsDir, remove .tsx extension
    let relPath = path.relative(componentsDir, filePath).replace(/\\/g, "/");
    relPath = relPath.replace(/\.tsx$/, "");
    return `export * from "./${relPath}";`;
  })
  .join("\n");

fs.writeFile(
  path.join(componentsDir, "index.ts"),
  '"use client";\n' + index,
  (err) => {
    if (err) throw err;
    console.log(`Generated index.ts with ${index.split("\n").length} exports`);
  }
);
