---
title: Design Rules
date: 2019-12-26 10:18:23
categories: design patterns
tags:
    - design patterns
---

## UNIX 的特点：

1. Everything (including hardware) is a file.所有的事物（甚至硬件本身）都是一个的文件。

2. Configuration data stored in text.以文本形式储存配置数据。

3. Small, single-purpose program. 程序尽量朝向小而单一的目标设计。

4. Avoid captive user interfaces.避免过于复杂花哨的界面。

5. Ability to chain program together to perform complex tasks.将几个程序连结起来，处理大而复杂的工作。

### Doug McIlroy（UNIX 管道的发明人、UNIX 传统的奠基人之一） 认为 UNIX 的哲学是这样的

1. Write programs that do one thing and do it well. 写一次只做一件事，并能把这件事做好的程序。

2. Write programs to work together. 写互相协作（调用）的程序。

3. Write programs to handle text streams, because that is a universal interface. 写处理文件流的程序。因为这（处理文件流）是一个通用接口。

### 《The Art of Unix Programming》 总结了下面这些哲学：

1. Rule of Modularity: Write simple parts connected by clean interfaces. 模块化原则：写简单的，能够用清晰的接口连接的代码。

2. Rule of Clarity: Clarity is better than cleverness. 清晰化原则：清晰的代码要好过“聪明”的代码。

3. Rule of Composition: Design programs to be connected to other programs. 组件化原则：设计可以互相关联（拆分）的程序。

4. Rule of Separation: Separate policy from mechanism; separate interfaces from engines. 隔离原则：策略和机制分离，接口和引擎分离。

5. Rule of Simplicity: Design for simplicity; add complexity only where you must. 简洁原则：设计力求简洁，直到无法更简洁。

6. ule of Parsimony: Write a big program only when it is clear by demonstration that nothing else will do. 小巧原则：不要写大的程序（模块、方法）。除非很明显的，没有别的办法可以完成。

7. Rule of Transparency: Design for visibility to make inspection and debugging easier. 透明原则：为可见性设计，使检查和调试更容易。

8. Rule of Robustness: Robustness is the child of transparency and simplicity. 健壮性原则：健壮性是透明和简单的孩子。

9. Rule of Representation: Fold knowledge into data so program logic can be stupid and robust. 陈述性原则：将认知转化为数据。所以，程序的逻辑可以是愚蠢（简单易懂）的，健壮的。

10. Rule of Least Surprise: In interface design, always do the least surprising thing. 最少的惊讶原则：在界面设计中，少做令人惊讶的设计。（不要标新立异）

11. Rule of Silence: When a program has nothing surprising to say, it should say nothing. 沉默原则：如果一个程序没有什么特别的东西要说（输出），那就什么都别说。

12. Rule of Repair: When you must fail, fail noisily and as soon as possible. 修复原则：如果必须失败，那就尽早。

13. Rule of Economy: Programmer time is expensive; conserve it in preference to machine time. 节约原则：程序员的时间是非常宝贵的。程序员的时间（编程时间）优于机器时间。

14. Rule of Generation: Avoid hand-hacking; write programs to write programs when you can. 生产原则：避免手工编程。如果可以的话，编写可以编写程序的代码。

15. Rule of Optimization: Prototype before polishing. Get it working before you optimize it. 优化原则：建立原型后再去修正。当它能正常工作后，再去优化它。

16. Rule of Diversity: Distrust all claims for “one true way”. 多样性原则：怀疑所有所谓的“不二法门”。

17. Rule of Extensibility: Design for the future, because it will be here sooner than you think. 扩展原则：为未来设计，因为未来来的比你想象的要早。

### Mike Gancarz （X Windows 的设计者）给出了下面九条哲学思想：

1. Small is beautiful. 小即是美。

2. Make each program do one thing well. 让每个程序（方法）只做一件事情，并把它做好。

3. Build a prototype as soon as possible. 尽早建立原型。

4. Choose portability over efficiency. 注重可移植性，而非效率。

5. Store data in flat text files. 将数据存储在存文本文件中。

6. Use software leverage to your advantage. 利用软件来发挥你的优势。

7. Use shell scripts to increase leverage and portability. 使用 Shell 脚本提高编程的手段和程序的可移植性。

8. Avoid captive user interfaces. 避免过于复杂花哨的界面。

9. Make every program a filter. 使每个程序（方法）称为一个过滤器（筛选器）
