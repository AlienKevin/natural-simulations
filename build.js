import { promises, writeFile } from 'fs';
import { join } from 'path';
import { compileToString } from "node-elm-compiler";
import { minify } from "terser";

// Make an async function that gets executed immediately
async function buildElm(sourceDir, targetDir) {
  // Our starting point
  try {
    // Get the files as an array
    const files = await promises.readdir(sourceDir);

    // Loop them all with the new for...of
    for (const file of files) {
      // Get the full paths
      const sourcePath = join(sourceDir, file);
      const targetPath = join(targetDir, file).replace(/\.elm/, ".js");

      // Stat the file to see if we have a file or dir
      const stat = await promises.stat(sourcePath);

      if (stat.isFile()) {
        if (file !== "Utils.elm") {
          compileToString([sourcePath], { optimize: true })
            .then(function (data) {
              const output = data.toString().replace(/\;\}\(this\)\)\;/, ";}(window));")
              const minimized = minify(output, {
                compress: {
                  pure_funcs: ["F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"],
                  pure_getters: true,
                  keep_fargs: false,
                  unsafe_comps: true,
                  unsafe: true
                },
                mangle: true
              }).code;
              writeFile(targetPath, minimized,
                function (err) {
                  if (err) {
                    return console.log(err);
                  }
                });
            });
        }
      }
      else if (stat.isDirectory()) {
        buildElm(sourcePath, targetPath);
      }

    } // End for...of
  }
  catch (e) {
    // Catch anything bad that happens
    console.error("We've thrown! Whoops!", e);
  }
}

buildElm("src", "dist");