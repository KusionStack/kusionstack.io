---
title: 测试规约
---
## 测试原则

在 Karpor 中，我们主要关注以下三种测试：

- 单元测试：主要关注 **最小可测试单元**（例如函数，方法，实用类等）
- 集成测试：针对 **多个单元（或模块）**间相互作用和集成的测试
- 端到端测试（e2e tests）： 针对 **整个系统行为** 的测试，通常需要模拟真实用户场景。

每种测试都有优势，劣势和适用场景。为了实现更好的开发体验，我们在编写测试时应遵循以下原则。

**测试原则**：

- 单个测试用例应该仅覆盖单个场景
- 遵循 **7-2-1 原则**，即 70% 的单元测试，20% 的集成测试和 10% 的端到端测试
- **非必要情况下，避免在单元测试中使用框架**（比如 `golang/mock`）。如果你觉得需要在单元测试中使用 mock 框架，那么你可能应该实现的是集成测试甚至端到端测试。

## 技术选择

在当前时间点，在 Go 语言生态中最流行的测试框架主要有 [Ginkgo](https://onsi.github.io/ginkgo/)/[Gomega](https://onsi.github.io/gomega/) 和 [Testify](https://github.com/stretchr/testify)。因此，本节主要讨论这两个测试框架的的特点、优缺点以及最终的选择。

### Ginkgo/Gomega

**优点**:

1. **BDD 支持**：Ginkgo 因为支持行为驱动开发（Behavior-Driven Development，BDD）风格而收到许多开发人员的青睐。它提供了丰富的 DSL 语法，通过 `Describe`、`Context`、`It` 等关键字使测试用例更具描述性和可读性。
2. **并行执行**：Ginkgo 能够以多进程并行执行测试，提高了测试执行的效率。
3. **丰富的匹配器**：与 Gomega 匹配器库结合使用时，它提供了丰富的断言能力，使测试更加直观和方便。
4. **异步支持**：Ginkgo 提供了对处理复杂异步场景的原生支持，降低了死锁和超时的风险。
5. **测试用例组织**：支持将测试用例组织到测试套件中，便于管理和扩展。

**缺点**:

1. **学习曲线过于陡峭**：对不熟悉 BDD 测试框架的开发者来说，Ginkgo 的 DSL 语法可能需要一些时间熟悉。
2. **并行测试的复杂性**：尽管 Ginkgo 支持并行测试，但是管理用于并行测试的资源和环境可能会引入额外的复杂性。

### Testify

**优点**:

1. **简化的接口 API**: Testify 提供了简单明了的 API，容易上手，特别是对于熟悉了 `testing` 包的开发者。
2. **Mock 支持**: 提供了强大的 Mock 功能，便于模拟依赖和接口进行单元测试。
3. **表格驱动测试**: 支持表格驱动测试，允许测试同一个函数使用各种不同输入和预期输出，增强了测试用例的可重用性。
4. **与 `testing` 包的兼容性**: Testify 与 Go 标准库的 testing 包高度兼容，可以无缝集成到现有的测试工作流中。
5. **文档**: Testify 的 [官方文档](https://pkg.go.dev/github.com/stretchr/testify) 也提供了丰富的介绍，如何使用其断言和 Mock 功能。

**缺点**:

1. **缺少 BDD 支持**: Testify 不支持 BDD 风格，对于寻求提高测试用例可读性的开发人员可能直观性较差。
2. **功能相对简单**: 与 Ginkgo 相比，Testify 的功能相对简单，可能不满足一些复杂测试场景的需求。

### 总结

简而言之，Ginkgo/Gomega 提供了更好的可读性和可维护性，产生清晰明了的测试代码，但需要熟悉 BDD 风格，学习曲线比较陡峭。Testify 更简单、更实用，学习曲线较为平缓，但随着时间的推移，测试代码风格可能变得更加多样化，降低可维护性。

考虑到 Karpor 的实际情况和两种框架的优缺点，我们决定结合使用这两个框架：

- 使用 Testify 进行单元测试，坚持使用 [表格驱动测试](https://go.dev/wiki/TableDrivenTests) 来约束代码风格，防止退化；
- 利用 Ginkgo 的 BDD 特性编写更高级别的集成和端到端测试；

这种组合充分发挥了两种框架的优势，提高了测试的整体效率、可读性和质量。

## 编写规范

### 测试风格

[表格驱动测试](https://go.dev/wiki/TableDrivenTests) 是编写测试用例的最佳实践，类似于编程中的设计模式，它也是官方 Go 语言推荐的风格。表格驱动测试使用表格提供各种输入和预期输出，允许同一个测试函数验证不同的场景。这种方法的优点是它增加了测试用例的可重用性，减少了重复代码，并使测试更加清晰易于维护。

虽然 Go 的 `testing` 包中没有直接支持表格驱动测试的语法，但可以通过编写辅助函数和使用匿名函数来模拟实现。

这是一个在 Go 标准库的 `fmt` 包中实现的表格驱动测试的示例：

```go
var flagtests = []struct {
    in  string
    out string
}{
    {"%a", "[%a]"},
    {"%-a", "[%-a]"},
    {"%+a", "[%+a]"},
    {"%#a", "[%#a]"},
    {"% a", "[% a]"},
    {"%0a", "[%0a]"},
    {"%1.2a", "[%1.2a]"},
    {"%-1.2a", "[%-1.2a]"},
    {"%+1.2a", "[%+1.2a]"},
    {"%-+1.2a", "[%+-1.2a]"},
    {"%-+1.2abc", "[%+-1.2a]bc"},
    {"%-1.2abc", "[%-1.2a]bc"},
}
func TestFlagParser(t *testing.T) {
    var flagprinter flagPrinter
    for _, tt := range flagtests {
        t.Run(tt.in, func(t *testing.T) {
            s := Sprintf(tt.in, &flagprinter)
            if s != tt.out {
                t.Errorf("got %q, want %q", s, tt.out)
            }
        })
    }
}
```

值得注意的是，目前大部分主流 IDE 都已经集成了 [gotests](https://github.com/cweill/gotests)，可以自动生成表格驱动风格的 Go 单元测试，相信这可以提升大家编写单元测试的效率：

- [GoLand](https://blog.jetbrains.com/go/2020/03/13/test-driven-development-with-goland/)
- [Visual Studio Code](https://juandes.com/go-test-vsc/)

### 文件命名

- **规范内容**：测试函数必须以 `Test` 开头，后面跟着被测试函数的名称，使用驼峰式命名法。
- **反面示例**：`xxx_test.go`
- **反面示例**：`testFile.go`、`test_xxx.go`

### 测试函数命名

- **规范内容**：测试函数名必须以 `Test` 开头，后面跟着被测试函数的名称，使用驼峰式命名法。
- **反面示例**：
  ```go
  func TestAdd(t *testing.T) {
      // 测试逻辑 ...
  }
  ```
- **反面示例**：
  ```go
  func TestAddWrong(t *testing.T) {
      // 测试逻辑 ...
  }
  ```

### 测试函数签名

- **规范内容**：测试函数签名必须是 `func TestXxx(t *testing.T)` 形式，其中 `t` 是类型为 `*testing.T` 的对象，并且不应该有其他的参数和返回值。
- **反面示例**：
  ```go
  func TestSubtraction(t *testing.T) {
      // 测试逻辑 ...
  }
  ```
- **反面示例**：
  ```go
  func TestSubtraction(value int) {
      // 测试逻辑 ...
  }
  ```

### 测试组织

- **规范内容**：测试用例应当相互独立，避免测试之间相互影响；使用子测试 `t.Run` 来组织复杂的测试场景。
- **反面示例**：
  ```go
  func TestMathOperations(t *testing.T) {
      t.Run("Addition", func(t *testing.T) {
          // addition 的测试逻辑 ...
      })
      t.Run("Subtraction", func(t *testing.T) {
          // subtraction 的测试逻辑 ...
      })
  }
  ```
- **反面示例**：
  ```go
  func TestMathOperations(t *testing.T) {
      // 混合 addition 和 subtraction 的测试逻辑 ...
  }
  ```

### Test Coverage

- **规范内容**：需要注意测试覆盖率，使用 `go test -cover` 命令检查代码的测试覆盖率。
- **反面示例**：

  ```shell
  $ go test -cover
  ```
- **反面示例**：

  ```shell
  $ go test # 不检查测试覆盖率
  ```
- **注意**: Karpor 将此命令包装为 `make cover`，它将在命令行中输出每个包的覆盖率和总覆盖率。如果你想在浏览器中查看覆盖率报告，请执行 `make cover-html`。

### 性能测试

- **规范内容**：性能测试应当以 `Benchmark` 开头，并且接受 `*testing.B` 类型的参数，专注于性能测试。
- **反面示例**：
  ```go
  func BenchmarkAdd(b *testing.B) {
      for i := 0; i < b.N; i++ {
          add(1, 1)
      }
  }
  ```
- **反面示例**：
  ```go
  func BenchmarkAddWrong(b *testing.B) {
      for i := 0; i < 1000; i++ {
          add(1, 1)
      }
  }
  ```

### 并发测试

- **规范内容**：对于并发代码，应该编写适当的测试用例，以确保并发逻辑的正确性。
- **反面示例**：
  ```go
  func TestConcurrentAccess(t *testing.T) {
      // 设置并发环境 ... 
      // 并发访问测试逻辑 ...
  }
  ```
- **反面示例**：
  ```go
  func TestConcurrentAccess(t *testing.T) {
      // 仅测试单线程逻辑...
  }
  ```

### 测试帮助函数

- **规范内容**：可以在测试文件中定义辅助函数来帮助设置测试环境或清理资源。
- **反面示例**：
  ```go
  func setupTest(t *testing.T) {
      // 设置测试环境 ...
  }

  func tearDownTest(t *testing.T) {
      // 清理资源 ...
  }

  func TestMyFunction(t *testing.T) {
      t.Run("TestSetup", func(t *testing.T) {
          setupTest(t)
          // 测试逻辑 ...
      })
  }
  ```
- **反面示例**：
  ```go
  // 直接在测试中设置环境和清理资源
  func TestMyFunction(t *testing.T) {
      // 设置测试环境 ... 
      // 测试逻辑 ... 
      // 清理资源 ...
  }
  ```

### 避免使用全局变量

- **规范内容**: 尽量避免在测试中使用全局变量以确保测试独立。
- **反面示例**: 在测试函数内部声明并使用必要的变量。
- **反面示例**: 在测试文件的顶部声明全局变量。

### 清晰的错误信息

- **规范内容**: 当测试失败时，输出清晰易懂的错误信息，帮助开发人员定位问题。
- **反面示例**:
  - `t.Errorf("Expected value %d, but got %d", expected, real)`
- **反面示例**:
  - `t.Errorf("Error occurred")`
  - `fmt.Println("Error occurred")`
  - `panic("Error occurred")`
