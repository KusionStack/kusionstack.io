## kusion workspace show

Show a workspace configuration

### Synopsis

This command gets the current or a specified workspace configuration.

```
kusion workspace show
```

### Examples

```
  # Show current workspace configuration
  kusion workspace show
  
  # Show a specified workspace configuration
  kusion workspace show dev
  
  # Show a specified workspace in a specified backend
  kusion workspace show prod --backend oss-prod
```

### Options

```
      --backend string   the backend name
  -h, --help             help for show
```

### Options inherited from parent commands

```
      --profile string          Name of profile to capture. One of (none|cpu|heap|goroutine|threadcreate|block|mutex) (default "none")
      --profile-output string   Name of the file to write the profile to (default "profile.pprof")
```

### SEE ALSO

* [kusion workspace](kusion-workspace.md)	 - Workspace is a logical concept representing a target that stacks will be deployed to

###### Auto generated by spf13/cobra on 29-Mar-2024