//グローバル変数
// 時間系
var start_date_time;
var lap_date_time;

//順位のポイントを定義する（コンストラクター）
function Point(input_point){
  this._1st = Number(input_point);
  this._2nd = this._1st * 0.8;
  this._3rd = this._2nd * 0.8;
  this.rank = [this._1st, this._2nd, this._3rd];
}

//00表示にさせる処理
function output_double_digest_number(number) {
  return ("0" + number).slice(-2);
}

//00表示にさせる関数
function output_digest_number(number) {
  var str = ("00" + number).slice(-3);
  return str.slice(0,2);
}

//タイマー表示の処理
function output_time_msg(input_time) {
  var time = Date.now() - input_time;
  var d = new Date(time);
  return output_double_digest_number(Math.floor(time / (60 * 60 * 1000))) + ':' + output_double_digest_number(d.getMinutes()) + '’' + output_double_digest_number(d.getSeconds()) + '’’' + output_digest_number(d.getMilliseconds());
}

//１位の回数を１つカウントする処理
function click_count_1st() {
  var count_1st = Number(document.getElementById("count_1st").textContent);
  count_1st++;
  document.getElementById("kaisu_1st").textContent = count_1st;
}

//順位ボタンが押された際、獲得合計ポイントが増える処理
function add_point_to_sumpoint(point){
  var sum = Number(document.getElementById("sum_point").textContent);
  sum += point;
  document.getElementById("sum_point").textContent = sum;
}

window.onload = function() {
  //画面起動時に１位のポイントを入力
  var point = new Point(prompt("１位の半角数値で入力してください"));
  alert("１位：" + point._1st + "pt ２位："　+ point._2nd + "pt ３位：" + point._3rd + "pt" + "\n" + "以上の内容で始めます。間違えた場合は、画面をリロードして下さい。");

  //イベントハンドラの登録
  //「計測開始」のイベントハンドラ
  document.getElementById("timer_start_button").addEventListener("click", function(){
    start_date_time = Date.now();
    timerId = setInterval(function() {
      document.getElementById("now_time").textContent = output_time_msg(start_date_time);
    }, 10);
  }, false);

  //「１位」〜「３位」のイベントハンドラ
  document.getElementById('1st_button').addEventListener('click', function(){
    add_point_to_sumpoint(point._1st);
  }, false);

  document.getElementById('2nd_button').addEventListener('click', function(){
    add_point_to_sumpoint(point._2nd);
  }, false);

  document.getElementById('3rd_button').addEventListener('click', function(){
    add_point_to_sumpoint(point._3rd);
  }, false);

};
