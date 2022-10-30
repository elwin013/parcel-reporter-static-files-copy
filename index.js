"use strict";
const { Reporter } = require("@parcel/plugin");
const fs = require("fs");
const path = require("path");

const PACKAGE_JSON_SECTION = "staticFiles";
const currentEnv = process.env.NODE_ENV;

const staticCopyPlugin = new Reporter({
  async report({ event, options }) {
    if (event.type === "buildSuccess") {
      getSettings(options.projectRoot)
        // Don't copy when env is specified and does not match.
        .filter((config) => (!config.env || config.env === currentEnv))
        .forEach((config) => {
          // Get all dist dir from targets, we'll copy static files into them
          const targets = Array.from(
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

          const staticPath =
            config.staticPath || path.join(options.projectRoot, "static");

          const fn = fs.statSync(staticPath).isDirectory() ? copyDir : copyFile;

          for (const distPath of distPaths) {
              fn(staticPath, distPath);
          }
        });
    }
  },
});

const copyFile = (copyFrom, copyTo) => {
  fs.copyFileSync(copyFrom, path.join(copyTo, path.basename(copyFrom)));
};

const copyDir = (copyFrom, copyTo) => {
  if (!fs.existsSync(copyTo)) {
    fs.mkdirSync(copyTo, { recursive: true });
  }
  const copy = (filepath, relative, filename) => {
    const dest = path.join(copyTo, relative);
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

/**
 * @returns {{staticPath?: string, staticOutPath?: string, env?: string}[]}
 */
const getSettings = (projectRoot) => {
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(projectRoot, "package.json"))
  );

  const settings = (packageJson[PACKAGE_JSON_SECTION] || []);
  if (!Array.isArray(settings)) {
    throw new Error('Config option "' + PACKAGE_JSON_SECTION +  '" must be supplied as an array.');
  }

  return settings;
};

exports.default = staticCopyPlugin;
