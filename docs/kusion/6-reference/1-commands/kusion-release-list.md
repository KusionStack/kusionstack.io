# kusion release list

List all releases of the current stack

### Synopsis

List all releases of the current stack.

 This command displays information about all releases of the current stack in the current or a specified workspace, including their revision, phase, and creation time.

```
kusion release list [flags]
```

### Examples

```
  # List all releases of the current stack in current workspace
  kusion release list
  
  # List all releases of the current stack in a specified workspace
  kusion release list --workspace=dev
```

### Options

```
      --backend string     The backend to use, supports 'local', 'oss' and 's3'.
  -h, --help               help for list
  -w, --workdir string     The work directory to run Kusion CLI.
      --workspace string   The name of target workspace to operate in.
```

### Options inherited from parent commands

```
      --profile string          Name of profile to capture. One of (none|cpu|heap|goroutine|threadcreate|block|mutex) (default "none")
      --profile-output string   Name of the file to write the profile to (default "profile.pprof")
```

### SEE ALSO

* [kusion release](kusion-release.md)	 - Manage Kusion release files

###### Auto generated by spf13/cobra on 26-Sep-2024