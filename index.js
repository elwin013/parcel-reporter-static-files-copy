"use strict";
const { Reporter } = require("@parcel/plugin");
const fs = require("fs");
const path = require("path");

const PACKAGE_JSON_SECTION = "staticFiles";
const currentEnv = process.env.NODE_ENV;

const staticCopyPlugin = new Reporter({
  async report({ event, options }) {
    if (event.type === "buildSuccess") {
      const configs = getSettings(options.projectRoot);

      // in case for multiple static files
      if (Array.isArray(configs)) {
        configs.map((config) => {
          if (config.env && config.env !== currentEnv) {
            continue;
          }
          // Get all dist dir from targets, we'll copy static files into them
          let targets = Array.from(
            new Set(
              event.bundleGraph
                .getBundles()
                .filter((b) => b.target && b.target.distDir)
                .map((b) => b.target.distDir)
            )
          );

          let distPaths = config.distDir ? [config.distDir] : targets;

          if (config.staticOutPath) {
            distPaths = distPaths.map((p) => path.join(p, config.staticOutPath));
          }

          let staticPath = config.staticPath || path.join(options.projectRoot, "static");

          for (let distPath of distPaths) {
            copyDir(staticPath, distPath);
          }
        });
      } else {
        // for single static file / dir
        if (config.env && config.env !== currentEnv) {
          continue;
        }
        let config = Object.assign({}, configs);
        // Get all dist dir from targets, we'll copy static files into them
        let targets = Array.from(
          new Set(
            event.bundleGraph
              .getBundles()
              .filter((b) => b.target && b.target.distDir)
              .map((b) => b.target.distDir)
          )
        );

        let distPaths = config.distDir ? [config.distDir] : targets;

        if (config.staticOutPath) {
          distPaths = distPaths.map((p) => path.join(p, config.staticOutPath));
        }

        let staticPath = config.staticPath || path.join(options.projectRoot, "static");

        for (let distPath of distPaths) {
          copyDir(staticPath, distPath);
        }
      }
    }
  },
});

const copyDir = (copyFrom, copyTo) => {
  if (!fs.existsSync(copyTo)) {
    fs.mkdirSync(copyTo, { recursive: true });
  }
  const copy = (filepath, relative, filename) => {
    const dest = filepath.replace(copyFrom, copyTo);
    if (!filename) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }
    } else {
      fs.copyFileSync(filepath, dest);
    }
  };
  recurseSync(copyFrom, copy);
};

/**
 * Recurse into directory and execute callback function for each file and folder.
 *
 * Based on https://github.com/douzi8/file-system/blob/master/file-system.js#L254
 *
 * @param dirpath directory to start from
 * @param callback function to be run on every file/directory
 */
const recurseSync = (dirpath, callback) => {
  const rootpath = dirpath;

  function recurse(dirpath) {
    fs.readdirSync(dirpath).forEach(function (filename) {
      const filepath = path.join(dirpath, filename);
      const stats = fs.statSync(filepath);
      const relative = path.relative(rootpath, filepath);

      if (stats.isDirectory()) {
        callback(filepath, relative);
        recurse(filepath);
      } else {
        callback(filepath, relative, filename);
      }
    });
  }

  recurse(dirpath);
};

const getSettings = (projectRoot) => {
  let packageJson = JSON.parse(fs.readFileSync(path.join(projectRoot, "package.json")));
  // return whole array if multiple static files are present
  if (Array.isArray(packageJson[PACKAGE_JSON_SECTION])) return packageJson[PACKAGE_JSON_SECTION];
  // just a single static item
  return Object.assign({}, packageJson[PACKAGE_JSON_SECTION]);
};

exports.default = staticCopyPlugin;
