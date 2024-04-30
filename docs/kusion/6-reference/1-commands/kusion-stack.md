# kusion stack

Stack is a folder that contains a stack.yaml file within the corresponding project directory

### Synopsis

Stack in Kusion is defined as any folder that contains a stack.yaml file within the corresponding project directory.

 A stack provides a mechanism to isolate multiple deployments of the same application, serving with the target workspace to which an application will be deployed.

```
kusion stack [flags]
```

### Options

```
  -h, --help   help for stack
```

### Options inherited from parent commands

```
      --profile string          Name of profile to capture. One of (none|cpu|heap|goroutine|threadcreate|block|mutex) (default "none")
      --profile-output string   Name of the file to write the profile to (default "profile.pprof")
```

### SEE ALSO

* [kusion](index.md)	 - Kusion is the Platform Orchestrator of Internal Developer Platform
* [kusion stack create](kusion-stack-create.md)	 - Create a new stack

###### Auto generated by spf13/cobra on 29-Apr-2024