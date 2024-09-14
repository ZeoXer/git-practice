# git 運作機制

在專案中初始化 git 後，專案目錄內會自動新增一個隱藏資料夾 `.git`，裡面紀錄了關於版本紀錄的各種資訊

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
