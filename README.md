# Open Badge Baking Example

**Under development**

This is a tool for baking a Blockcert assertion into a png file, per the Open Badges specification.


## Baking

```
node index.js -b -i cert-image.png -o baked-blockcert.png -B sample-blockcert.json 
```

## Extract assertion from baked image
```
node index.js -x -o baked-blockcert.png 
```

## Usage
```
node index.js --help

```