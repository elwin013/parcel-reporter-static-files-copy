# parcel-reporter-static-files-copy

ParcelJS v2 plugin to copy static files from some directory to output dir. There is no watcher - 
files are copied on build finish.


## Install

```
yarn add parcel-reporter-static-files-copy --dev
```

```
npm install -D parcel-reporter-static-files-copy
```

## Usage

1. Create `static` directory in your project root.
2. Fill it with your static files
3. Add plugin to `.parcelrc`:
```
{
  "extends": ["@parcel/config-default"],
  "reporters":  ["...", "parcel-reporter-static-files-copy"]
}
```
4. Run build - and that's all! Files from `static` directory will end up in `dist`!

## Customization

Beyond the default settings, you can:

1. Name of the directory to be copied.

```json
// package.json
  {
	...
  "staticFiles": {
    "staticPath": "customStatic"
  }
```

2. Destination of static files

Destination of static files can be set in plugin configuration. It will be
overriden while using `--dist-dir` Parcel option (works with Parcel `2.0.0-beta.1`).

```json
// package.json
  {
	...
  "staticFiles": {
    "distPath": "customDist"
  }
```

3. Specify directory to copy static files into

If files from `staticPath` needs to get copied into a subdirectory inside the dist dir - 
`staticOutPath` can be used:

```json
// package.json
  {
	...
  "staticFiles": {
    "staticOutPath": "vendor"
  }
```

4. Specify buildTarget specific directories as copy targets.

If you have different destination directories specified for each build target, you can set these using the following configuration pattern. 

Note that this ignores the `--dist-dir` configured on each build invocation.

```json
	...
	"staticFiles": {
	   "buildModeOutPath" : {
	       "development" : "target/dev",
	       "production" : "target/dist"
	   }
   }
   ...
```

### Additional examples

Check [examples](https://github.com/elwin013/parcel-reporter-static-files-copy/tree/master/examples) directory for 
additional examples. 

## Flaws and problems

At this moment this plugin copies all static files from some static dir to output (dist) directory. There is no 
watcher on static files - only trigger is finishing build (no matter if normal build or serving).

## Contribute

You're interested in contributing? Awesome! Fork, make change, commit and create pull request. I'll do my best to merge 
changes!

## Thanks and acknowledgement

Special thanks to,

- [@gmougeolle](https://github.com/gmougeolle/)

- Bhagya Silva - [@bhagyas](https://github.com/bhagyas/)


## License

[MIT](/LICENSE)
