# ls-ver

List Kusion versions to install, alias: "lsv"

### Synopsis

List available Kusion versions matching a regexp filter for installation. If no filter is provided,
list all available versions.

```
kusionup ls-ver [REGEXP] [flags]
```

### Examples

```

  kusionup ls-ver
  kusionup ls-ver latest
  kusionup ls-ver 0.2

```

### Options

```
  -h, --help   help for ls-ver
```

### Options inherited from parent commands

```
  -c, --custom-sources-file string   Custom sources file
  -v, --verbose                      Verbose
```

### SEE ALSO

* [kusionup](index.md)	 - The Kusion installer
