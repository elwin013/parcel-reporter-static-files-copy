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

1. Create `static` directory in you project root.
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

```json
// package.json
  {
	...
  "staticFiles": {
    "distPath": "customDist"
  }
```

### Additional example

Check [examples](https://github.com/elwin013/parcel-reporter-static-files-copy/tree/master/examples) directory for 
additional example. 

## Flaws and problems

At this moment this plugin copies all static files from some static dir to output (dist) directory. There is no 
watcher on static files - only trigger is finishing build (no matter if normal build or serving).

## Contribute

You're interested in contributing? Awesome! Fork, make change, commit and create pull request. I'll do my best to merge 
changes!

## Thanks and acknowledgement

Special thanks to [@gmougeolle](https://github.com/gmougeolle/).

## License

[MIT](/LICENSE)