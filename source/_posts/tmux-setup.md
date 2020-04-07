---
title: Tmux Setup
date: 2020-03-29 14:04:10
categories: linux
tags: tmux
---

tmux 是一款优秀的终端复用软件，功能：

1. 丝滑分屏：能横向竖向分屏，还能调整分屏大小
2. 保护现场：即使退出终端重启服务器，依然能够回到现场
3. 会话共享：可以让其他用户接入某个 `tmux` 会话，从而进行演示

![image-20200407162325829](/image/tmux-setup/image-20200407162325829.png)

## 安装

### Mac OSX

```shell
# 先安装Homebrew，有则跳过
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
# 安装tmux
brew install tmux
```

### Linux

```shell
sudo apt-get install tmux
```

## 组成

tmux 功能由三部分构成

1. 会话：一次会话
2. 窗口：类似 Tab 页
3. 面板：可以分屏

### 关系

1. 一个会话可以由多个窗口
2. 一个窗口可以有多个面板

## 会话

在终端新建一个会话

```shell
tmux new -s '会话名'
```

查看所有会话

```shell
tmux ls
```

挂起当前会话

```shell
tmux detach # 或者快捷键 <Leader><C-z>
```

进入之前的会话

```shell
tmux a -t '会话名'
```

关闭会话

```shell
tmux kill-session -t '会话名'
tmux kill-server # 关闭所有会话
```



## 快捷键

在指令前需有前缀，默认是 <C-b>

### 会话

| 指令  |         描述         |
| :---: | :------------------: |
|   `?`   |    快捷键帮助文档    |
|   `d`   |     断开当前会话     |
|   `D`   |   选择要断开的会话   |
| `<C-z>` |     挂起当前会话     |
|   `r`   |   强制重载当前会话   |
|   `s`   |  显示会话列表并切换  |
|   `:`   |    进入命令行模式    |
|   `[`   | 进入复制模式，q 退出 |
|   `]`   | 粘贴复制模式中的文本 |

### 窗口

| 指令 | 描述                           |
| ---- | ------------------------------ |
| `c`    | 新建窗口                       |
| `&`    | 关闭当前窗口                   |
| `0~9`  | 切换到指定窗口                 |
| `p`    | 切换到上一个窗口               |
| `n`    | 切换到下一个窗口               |
| `w`    | 打开窗口列表，用于切换         |
| `,`    | 重命名当前窗口                 |
| `.`    | 修改当前窗口编号               |
| `f`    | 快速定位到某个窗口，f 查找名称 |

### 面板

| 指令    | 描述                       |
| ------- | -------------------------- |
| `"`       | 往下分割面板               |
| `%`       | 往右分割面板               |
| `x`       | 关闭当前面板               |
| `z`       | 最大化或正常化当前面板     |
| `!`       | 把面板移到新的窗口打开     |
| `;`       | 切到最后一次使用的面板     |
| `q`       | 显示面板标号，可以接着跳转 |
| `{`       | 向前换位面板               |
| `}`       | 向后换位面板               |
| `<C-o>`   | 顺时针旋转面板位置         |
| `o`       | 选择下一面板               |
| `<Space>` | 在自带的面板布局中循环切换 |
| `t`       | 显示时钟                   |

## 配置

以下是我的 tmux 配置

```shell

set -g prefix C-t   						# 切换默认前缀

setw -g mode-keys vi 						# 使用 vim 快捷键进行移动操作
set -g base-index 2  						# 
set -g mouse on      						# 开启鼠标
set -g pane-base-index 1				# 面板从 1 开始计数
set -g renumber-windows on			# 有窗口关闭时重新编号窗口

set -g allow-rename off					# 重命名
set -g automatic-rename off			

set -g @plugin 'seebi/tmux-colors-solarized'					# 主题插件
set -g @plugin 'tmux-plugins/tmux-pain-control'				# 面板快捷分割插件，会修改快捷键
set -g @plugin 'tmux-plugins/tmux-prefix-highlight'   # 高亮
set -g @plugin 'tmux-plugins/tmux-resurrect'					# 恢复现场
set -g @plugin 'tmux-plugins/tmux-sensible'
set -g @plugin 'tmux-plugins/tmux-yank'
set -g @plugin 'tmux-plugins/tpm'											# 插件管理插件

set -g @resurrect-dir '~/.tmux/resurrect'

set -g @colors-solarized '256'

set -g status-right '#{prefix_highlight} #H | %a %Y-%m-%d %H:%M'
set -g @prefix_highlight_show_copy_mode 'on'
set -g @prefix_highlight_copy_mode_attr 'fg=white,bg=blue'

run '~/.tmux/plugins/tpm/tpm'

```

### 保存和恢复会话

由 resurrect 插件提供：

| 指令 | 描述     |
| ---- | -------- |
| s    | 保存会话 |
| r    | 恢复会话 |

