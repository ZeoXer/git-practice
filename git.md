# git 運作機制

在專案中初始化 git 後，專案目錄內會自動新增一個隱藏資料夾 `.git`，裡面紀錄了關於版本紀錄的各種資訊，將該目錄展開可以看到部分結構如下：

```
(使用當前的 git-practice 底下的 .git 目錄)
│(...以上省略)
├─objects
│  ├─22
│  ├─2c
│  ├─36
│  ├─4b
│  ├─56
│  ├─65
│  ├─fb
│  ├─info
│  └─pack
├─refs
│   ├─heads
│   ├─remotes
│   │  └─origin
│   └─tags
├─HEAD
├─(...以下省略)
```

## objects

git 是以 key-value 的形式來儲存這些過往的版本紀錄，當提交 commit 時，git 會透過 SHA-1 hash function 將提交的內容也透過 hash function 轉換成一組 key，並以結果的前兩碼作為名稱在 `objects` 底下生成一個資料夾 (例如上方的 22、2c、...)，剩餘的部分作為目錄內檔案的名稱，檔案內則是將當時版本所有內容壓縮成 binary file 儲存起來 ，如此便生成了一組 **blob**，只追蹤了檔案裡的內容而不包含檔案名稱。

不過每次提交往往都會牽涉到不只一個檔案，也就是會有許多的 blob 需要被記錄追蹤，此時就需要更大的物件來記錄這些結構，而這便是 **tree** 所負責的工作。一個 tree 會由多個 blob，或甚至是 blob 和 tree 所組成，而他們各自的 hash 編號以及檔案/目錄名稱也都會被記錄在其中。

最後，除了會提交當時的版本內容，git 還會將前一次的 commit hash 以及作者、commit message 等相關資訊通通蒐集進來，將所有東西集合起來就形成了一個 **commit**。

總結來說，以記錄的範疇來看可以分成以下三個層級：

```
commit(紀錄最上層的 tree 以及其他相關資訊) > tree (紀錄檔案、資料夾的上下結構和名稱) > blob (只紀錄檔案內容)
```

以當前的專案結構為例，可以透過下方指令來查看當前目錄的檔案 hash 資訊：

```=shell
$ git cat-file -p main^{tree}
100644 blob 562795b22d0819318e593a68177c55c3ac820837    git.md
100644 blob 65b5c7615c388360b044f2f0d94f0491d4654105    readme.md
100644 blob fb0d3e90f8281232e740630d28b1ed7a6a674a34    video.md
```

可以觀察到目錄中的三個檔案以 blob 形式被儲存下來，而各自的 hash 也對應到上方目錄中 `objects` 的 56、65 和 fb。

若是放入特定的 commit hash：

```=shell
$ git cat-file -p 2c15a07
tree 36aa55cf763e6e5e4b55c96553e43a6c31875484
parent 22811ab5ff669925c0eea163553c23279fd10652
author ZeoXer <andrew17413@gmail.com> 1726287401 +0800
committer ZeoXer <andrew17413@gmail.com> 1726287401 +0800

UPDATE: update content in git.md about commit message
```

則可以觀察到除了 tree、parent 對應到 `objects` 中的 36、22 之外，也另外紀錄了作者和 commit message 等資訊。

## refs

branch 的作用主要是讓使用者在開發時可以透過切換不同的 branch 來處理不同的任務，也有助於在分工時讓彼此的東西不要糾纏在一起，當開啟一個新分支時，git 會使用當前的版本 (commit) 開啟一條新的分支，此時 `refs/heads` 裡便會多出一個以這個新分支為名的檔案，並紀錄當前的 commit hash。

在 refs 中分成 heads 和 remotes 兩個部分，其中 heads 中會存放以各個 branch 的名稱為名的檔案，內容記錄了各分支目前最新提交紀錄的 commit hash，當使用者切換到該分支時，便可以從這個檔案紀錄的 hash 去找到對應的版本呈現內容出來，至於 remotes 則主要追蹤遠端來源的版本紀錄。

## HEAD

一般情況下，裡面會記錄目前使用者的視角在哪一個 branch 當中，並到 `refs/heads/<branch>` 尋找、進入該分支最新的 commit 版本裡。而若是使用 `git checkout <commit_hash>` 跳到先前的 commit 版本時，就會進入「detached HEAD」的狀態，此時的 HEAD 便會記錄目前所在的 commit hash 編號。

# commit message 撰寫風格

我認為 commit message 是應該要有一定程度的規範的，如同 coding style 的作用類似，在團隊合作的情境中保持相同的撰寫風格可以讓維護成本降低許多。

不過撰寫 commit message 的複雜度勢必也會影響到撰寫、閱讀所需花費的時間，在參考了一些相關資料後，我認為 commit message 內容的多寡一定程度取決於專案的規模，而撰寫原則大概為：

## HEADER

開頭的部分內容需要簡要清晰，讓閱讀者可以快速掌握該 commit 的關鍵資訊。

### TYPE

通常是定義好的單詞，用來表示此次 commit 的類型為何，例如 **feat** 代表新功能的添加、**fix** 代表錯誤的修正、**test** 代表牽涉測試相關的內容等等。透過閱讀最前面的 TYPE 可以快速的掌握該 commit 所作的內容屬於哪一種分類，以快速判別該 commit 是否為自己要關注或尋找的部分。

### SCOPE (選填)

說明 commit 變動到的範圍層級，在專案規模較小的情境下可以選擇是否填入。

### SUBJECT

簡要的統整敘述此次 commit 做了什麼事情。

## BODY

對於 commit 中改動到的程式碼部分，盡量以單行的字數內 (約 72 字) 說明改動的內容、原因和前後的對比。

## FOOTER

此區塊主要包含兩個部分，其一是若團隊使用例如 Github Issue 或其他類似的管理工具來控管專案的話，可以在此處帶上對應的編號。其二則是若此次 commit 會造成前後版本不相容的話，可以使用 BREAKING CHANGE 來敘述改動的相關資訊。

> #### 參考資料：
>
> - [Git Commit Message 這樣寫會更好，替專案引入規範與範例](https://ithelp.ithome.com.tw/articles/10228738)
> - [Git Commit Message 格式與規範整理](https://hackmd.io/@dh46tw/S1NPMsy5L)
> - [AngularJS Git Commit Message Conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#heading=h.uyo6cb12dt6w)
