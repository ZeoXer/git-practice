- /etc 是 editable text config 的縮寫，裡面存放各個應用的設定檔，可以透過文字編輯器來去修改
- /var 目錄裡存放系統使用的變數檔案，如 log 或是 cache 相關的檔案
- /boot 目錄當中通常存放系統啟動所需要的核心檔案
- $PATH 記錄了不同應用的關鍵字，讓我們可以在終端機中使用關鍵字來啟動對應的服務
- which 指令可以幫助查尋應用執行檔的完整路徑位置

1. 43.200.175.100
2. Instance type 是 AWS 中的執行個體類型，擁有不同組合的 CPU、記憶體、儲存空間等配置，讓使用者可以根據需求挑選適合的資源
3. Nginx 是一個網路伺服器套件，可以控制外部連線進來的使用者將其導引到對應的伺服器上來提供服務，也可以處理流量的平衡控制
4. pm2 可以幫助管理 Node.js 的專案，控管不同伺服器的開關、狀態以及監控其記憶體用量，另外也有自動化的功能讓更新伺服器，或甚至主機重啟時都可以自動將伺服器恢復上線
5. proxy 通常是進行請求轉發的動作，在本次作業中操作的部分是 reverse proxy，將使用者的請求透過 Nginx 轉發到主機內的伺服器中，一方面可以隱藏主機的 IP 位址並加強安全性，一方面也可以平衡伺服器的負載。至於 forward proxy 則主要用於隱藏使用者端的 IP 位址來達到繞過防火牆限制的效果。
6. Nginx 設定檔如下

```nginx
server {
    listen 80;
    server_name 43.200.175.100;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

7. Security Group 是一個防護的機制設定，可以限制連線進來的 IP、port、協定等
8. sudo 是一個 Linux 平台的指令工具，可以讓非系統管理員的使用者獲得一部份的權限來執行一些權限較高的任務，例如修改系統設定檔
9. 在目錄 `var/log/nginx` 底下可以找到 `access.log` 和 `error.log` 來查看紀錄，主要可以透過 `error.log` 來查看伺服器在運作的過程中是否有出現異常的狀態
10. 無
11. 參考資料

    https://aws.amazon.com/tw/ec2/instance-types/
    https://www.youtube.com/watch?v=42iQKuQodW4
    https://www.youtube.com/watch?v=7VAI73roXaY
    https://pm2.keymetrics.io/
    https://note.drx.tw/2008/01/linuxsudo.html
