numMines = 10; //地雷的數量
mineWidth = 10; //踩雷區的寬度有幾格
mineHeight = 10; //踩雷區的高度有幾格

numCellsClicked = 0; //己經踩了幾個地雷
bombs = new Array(); //記錄地雷位置的陣列
function run() {
    mine = document.getElementById('mine'); //先取得踩雷區

    for (i = 0; i != mineWidth; i++) {
        for (j = 0; j != mineHeight; j++) {
            cell = document.createElement('button'); //產生button元件
            cell.setAttribute('id', i + '_' + j); //由座標給它id
            cell.setAttribute('onclick', 'sweep(this)'); //滑鼠左鍵按下就執行sweep()
            cell.setAttribute('oncontextmenu', 'mark(this)'); //按右鍵進行標記
            cell.innerHTML = '&nbsp;'; //預設的內容文字是空白
            mine.appendChild(cell); //把按鈕附加到踩雷區
        }
        mine.innerHTML = mine.innerHTML + '<BR/>'; //折到下一行
    }

    document.getElementById('remain').innerHTML = numMines; //改變remain的內容

    for (i = 0; i != mineWidth; i++) { //設定地雷陣列的預設值為0
        bombs[i] = new Array();
        for (j = 0; j != mineHeight; j++) {
            bombs[i][j] = 0;
        }
    }
}

function rand(q) {
    return Math.floor(Math.random() * (q));
}

function sweep(obj) {
    current_i = parseInt(obj.id.split('_')[0]); //obj的row座標
    current_j = parseInt(obj.id.split('_')[1]); //obj的column座標
    if (numCellsClicked == 0) {
        timer(); //第一次踩雷, 開始讀秒
        count = 0;
        while (count != 10) { //用亂數配置地雷
            i = rand(mineWidth);
            j = rand(mineHeight);
            if (bombs[i][j] != 1 && i != current_i && j != current_j) {
                count++;
                bombs[i][j] = 1;
            }
        }
    }

    if (obj.innerHTML == '<i class="fab fa-font-awesome-flag"></i>') //己經標記了
        return;

    if (bombs[current_i][current_j] == 1) { //踩到地雷
        clearTimeout(gameTimer);
        obj.innerHTML = '<i class="fas fa-bomb"></i>';
        alert('失敗!');
        return;
    }

    numCellsClicked++; //踩過的數量加一

    sum = 0;
    if (current_i - 1 >= 0) { //計算上一個row的地雷總和
        sum = sum + bombs[current_i - 1][current_j];
        if (current_j - 1 >= 0) //如果不在最左邊
            sum = sum + bombs[current_i - 1][current_j - 1];
        if (current_j + 1 < mineWidth) //如果不是最右邊
            sum = sum + bombs[current_i - 1][current_j + 1];
    }
    if (current_i + 1 < mineHeight) { //計算下一個row的地雷總和
        sum = sum + bombs[current_i + 1][current_j];
        if (current_j - 1 >= 0)
            sum = sum + bombs[current_i + 1][current_j - 1];
        if (current_j + 1 < mineWidth)
            sum = sum + bombs[current_i + 1][current_j + 1];
    }
    if (current_j - 1 >= 0) //加上左邊的
        sum = sum + bombs[current_i][current_j - 1];
    if (current_j + 1 < mineWidth) //加上右邊的
        sum = sum + bombs[current_i][current_j + 1];

    obj.innerHTML = sum;
    obj.setAttribute('disabled', 'disabled');

    if (numCellsClicked == mineWidth * mineHeight - numMines) { //破關
        alert('破關!');
        clearTimeout(gameTimer);
    }
}

var SetMinute = 0;

function timer() {
    SetMinute += 1;
    var Check_i = document.getElementById("timer");
    var Cal_Minute = Math.floor(Math.floor(SetMinute % 3600) / 60);
    var Cal_Second = SetMinute % 60;
    Check_i.innerHTML = Cal_Minute + "分" + Cal_Second + "秒";
    gameTimer = setTimeout('timer()', 1000);
}



function mark(obj) {
    marked = document.getElementById('remain');
    if (obj.innerHTML == '<i class="fab fa-font-awesome-flag"></i>') { //取消標記
        obj.removeAttribute('disabled'); //取消disabled
        obj.innerHTML = '&nbsp;'; //還原內容
        if (parseInt(marked.innerHTML) - 1 >= 0)
            marked.innerHTML = parseInt(marked.innerHTML) + 1;
    } else {
        obj.innerHTML = '<i class="fab fa-font-awesome-flag"></i>'; //標記
        marked.innerHTML = parseInt(marked.innerHTML) - 1;
    }
}



$('#btn').on('click', () => {
    window.location.reload();
})