# parcel-reporter-static-files-copy - changelog

## 1.3.4 - 30/11/2021

Bump - only to put forgotten Changelog into npm package ;-)

## 1.3.3 - 29/11/2021

Change peer dependency of parcel plugin to dependency.

## 1.3.2 - 25/11/2021

Use `path.join` instead of string replacement when resolving
file destination path.

## 1.3.1 - 16/11/2021

Change dependency of parcel plugin to peer dependency.

README.md update - regarding "..." from Parcel configuration.

## 1.3.0 - 25/03/2021

Added correct way of handling `--dist-dir` Parcel
parameter.

Breaking change - `staticFiles.distPath` overrides
`--dist-dir` option not otherwise.

## 1.2.2 - 25/03/2021

Bugfix - create the directory where static files will
be put BEFORE trying to copy them.

## 1.2.1 - 01/02/2021

Minor changes - removing forgotten console.log.

## 1.2.0 - 01/02/2021

Added option to specify a path where to put static
files in dist directory - `staticFiles.staticOutPath`.

Bring back reading `--dist-dir` Parcel parameter.

## 1.1.1 - 30/01/2021

Bugfix for creating paths - use path.join
instead of hardcoded slash.

## 1.1.0 - 29/01/2021

Added option to specify custom dist path
in configuration (in `package.json`) - `staticFiles.distPath`.

## 1.0.0 - 25/01/2021

Initial version.
