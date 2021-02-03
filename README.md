# @oneisland/module-packer

Quick and easy packaging of libraries and modules

## Installation

Install the package via npm

```bash
npm install @oneisland/module-packer
```

## Usage

Setup a new library or module

```bash
module-packer init [name]
```

Package up a library or module using `webpack`

```bash
module-packer build [webpack-cli-flags]
```

Package up and watch a library or module using `webpack -w`

```bash
module-packer watch [webpack-cli-flags]
```

Package up and serve a library or module using `webpack serve`

```bash
module-packer serve [webpack-cli-flags]
```

