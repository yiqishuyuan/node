** 使用git --global user.name '用户名' **
** 使用git --global user.email '邮箱' **
<hr>
>> git init 配置本地.git仓库
<hr>
>> git add 文件名 ---暂存指定文件
<hr>
>> git add . 暂存所有指定文件
<hr>
>> git commit -m '注释说明'  ----提交并保存，产生版本快照
<hr>
>>git ls-files 查看暂存区文件
<hr>
>> git status -s 查看文件状态
<hr>
>> git restore 文件名  ---从暂存区恢复本地已经修改的文件
<hr>
>> git rm --cached 文件名 --从暂存区删除
<hr>
>> git log --oneline   提交保存的历史记录
<hr>
>> git reset --hard 版本号   ----覆盖暂存区和工作区命令
<hr>
>> git reflog --oneline   -----覆盖后的的提交历史
<hr>
>> 忽略npm 包文件，dist分发文件，配置文件，钥匙文件，日志文件等。请当前文件创建(.gitignore)
<hr>
>> git branch ----查看分支
<hr>
>> git branch 名字 ----创建分支
<hr>
>> git checkout 名字   ----选择分支
<hr>
>> git merge 分支名       ------合并分支
>> git branch -d 分支名    -----删除分支
<hr>
# 远程命令
 
   1. 链接 === git remote add 随意名称 远程地址  //删除 git remove
   2. 推 === git push -u 随意名称 本地分支:远程分支
   3. 拉 === git clone 远程地址
   4. 更新 === git pull 地址的仓库 远程分支：本地分支
   5.更新分为 fetch 和 merge 
