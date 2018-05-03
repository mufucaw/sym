# Sane YAML Merger

## What does it do?
Merges two or more YAML files without destroying/renaming aliases and anchors.

## How does it work?
It temporarily replaces every alias and anchor with a hash in each file, then merges the YAML files together and replaces each alias and anchor.

## How do I use it?
```yarn add sym```
or
```npm install sym```

then...

```
import { merge } from sym

const mergedYaml = merge('file1.yml', 'file2.yml', 'file3.yml')
```
or
```
const { merge } = require('sym')

const mergedYaml = merge('file1.yml', 'file2.yml', 'file3.yml')
```
