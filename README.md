期末專題:踩地雷

1.簡介:
這次專題做了個大家小時候都玩過的簡單小遊戲--踩地雷，複習了這學期學的html、css以及js，也多學了一些js的功能。

2.網頁使用方式:
  1)在使用者點下任意一個地雷區，遊戲就開始了，上面的時間也會開始計時。
  2)點下的地雷區會顯示周圍九宮格內的地雷數目。
  3)右鍵可以標記玩家認為的地雷區位置(會插上一個小旗子)，已標記區在案一次右鍵會解除標記，剛開始是10顆地雷，每標記一顆，下面的地雷統計數目會少1。
  4)當用左鍵點到地雷遊戲就輸了，時間會停止，並跳出失敗的提示。
  5)若成功標記出10顆地雷，會跳出成功的提示，時間也會停止。
  6)如果想再玩一次，則可按下最下面的按鈕，則遊戲重新開始。
  
3.本專題作法:
  1)用getElementById取得html的計時器、地雷區、剩餘地雷數目。
  2)用陣列做出10*10的地雷區button。
  3)用亂數配置地雷。
  4)用onContextMenu來鎖右鍵，再讓右鍵點到可以上標記。
  5)用window.location.reload來重置遊戲。
  6)把有地雷區設1，再利用陣列來計算九宮格的地雷數。
  7)部分利用jquery來輔助。