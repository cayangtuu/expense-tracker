# 記帳工具(expense-tracker)
提供每位使用者紀錄每一筆花費，且可以進行花費分類及金額計算。

### 網頁外觀
#### 使用者登入瀏覽餐廳頁面
![image](https://github.com/cayangtuu/expense-tracker/blob/main/public/%E8%A8%98%E5%B8%B3%E4%B8%BB%E9%A0%81.PNG)

### 功能描述 (features)
- 使用者可以註冊並且登入個人帳目清單頁面
- 使用者可以透過facebook帳號登入頁面
- 使用者可以瀏覽所有的帳目清單，包含日期、分類、金額、及計算總花費金額
- 可以依照帳目類別進行帳目搜尋
- 可新增、編輯、刪除一筆帳目
- 網頁伺服器出現問題時，將於網頁畫面中顯示錯誤訊息

### 安裝與執行步驟 (installation and execution)
1. 打開終端機(Terminal)，將專案clone至本機位置
```
git clone https://github.com/cayangtuu/expense-tracker.git
```
2. 進入專案資料夾
```
cd expense-tracker
```
3. 安裝專案所需npm套件
```
npm install
```
4. 將種子資料匯入mongodb中
```
npm run seed
```
終端機顯示```mongodb connected!```及```done!```即代表成功匯入種子資料  
按下Ctrl+C退回終端機輸入指令狀態

5. 完成後，即可開始執行程式
```
npm run dev
```
終端機出現```App is running on http://localhost:${port}```字樣即代表伺服器正常啟動

6. 開啟任一瀏覽器並於網址中輸入下列網址，即可連至網頁
```
http://localhost:3000
```

### 環境建置與需求(prerequisites)
##### Code編輯器
- Visual Studio Code
##### Node環境及套件
- Node.js-16.18.0
##### 資料庫
- MongoDB
