function init() {
  var onechar;
  var twochar;
  var result = 0; // 총값
  var spareflag = false;
  var sp1 = 0; // 이전값 one
  var sp2 = 0; // 이전값 two
  var flag = 0;
  start();
  
  function drowone(one) {
    if (one == 0) {
      one = "-";
    } else if (one == 10) {
      one = "X"; // drowtwo "-" 같이 그려줘야함;
    }
  }

  function drowtwo(two, rest) {
    if (two == 0) {
      two = "-";
    } else if (two == rest) {
      two = "/";
    }
  }
  
  function htmlTableOne(one,i){
    var a = i;
    a-=1;
    var tr1 = document.getElementById("data" + a);
//    var one =  drowone(one);
//      var cell = tr1.insertCell(0);
    tr1.innerHTML = "<td>"+ one +"</td>";
   /* var last = tr1.insertCell(20);
    last.innerHTML = three;*/
  }
  function htmlTableTwo(two , rest ,i){
    var a = i;
    a-=1;
    var tr1 = document.getElementById("data" + a);
//    var two = drowtwo(two , rest);
//     var cell1 = tr1.insertCell(0);
     tr1.innerHTML = "<td>"+ two +"</td>";
    
   /* var last = tr1.insertCell(20);
    last.innerHTML = three;*/
  }
  function totalSum(i){
    var td = document.getElementById("result" + i);
    td.innerHTML = result;
  }
  function strike(nextone,nexttwo,i){
    result += Number(nextone) + Number(nexttwo) + Number(sp1) ; 
    totalSum(i);
//    alert("Number(nextone) = "+ Number(nextone));
//    alert("Number(nexttwo) = "+ Number(nexttwo));
//    alert("Number(sp1)= "+ Number(sp1));
    alert("스트라이크" + result);
    
  }
  function double(nextone,nexttwo,i){
//    alert("nextone" + nextone);
//    alert("nexttwo" + nexttwo);
    result += 10 + 10 + Number(nextone) ; //first x;
    alert("double x1 = " + result);
    totalSum(i-1);
    result += 10 + Number(nextone) + Number(nexttwo); //secend x;
    alert("double x2 = " + result);
    totalSum(i);
  }
    function truky(nextone,nexttwo,i){
    result += 30; /*+ Number(nextone) + Number(nexttwo);*/
    totalSum(i);
    alert("truky = " + result);
    }
    
  function spare(nextone,i) { // 다음1구값
      result += Number(sp1) + Number(sp2) + Number(nextone);
      totalSum(i-1);
      alert("스페어 result =" + result);
  }

  function onelogicCheck(state, one) { // one만 입력받을지 체크
    if (one == 10) { // 스트라이크 = 1한번만 받음
      state = true;
    } else { // 그외에는 2번씩 다 입력 받겠다.
      state = false;
    }
    return state;
  }



  function start() { // 모드 선택
    var mode = confirm("사용자 모드 선택하세요 \n\n확인 = 사용자 모드  ,취소 = 컴퓨터 모드");
    alert("총게임은 10 판(프레임)으로 진행됩니다.");
    if (mode == true) {
      alert("사용자 모드 선택했습니다.");
      user();
    } else {
      alert("컴퓨터 모드 선택했습니다.");
      com();
    }
  }
  
  function errorcheck(input) { // input data check
    var regex = /^[0-9]{1,2}$/g;
    var val = input;
    var errorTest = false;

    if (regex.test(val)) {
      errorTest = isNaN(val) ? false : true;
      if (val >= 0 && val < 11) {
        return val;
      }
    }
  }
  
  function undefinedcheck(number, i) {
    while (number == undefined) {
      number = input(i); // re input error
    }
    return number;
  }

  function restcheck(rest, two, i) { // rest ball check
    var flag = false;
    var check;
    while (flag == false) {
      if (two > rest) {
        alert("공 보다 많습니다. 남은공 : " + rest);
        check = input(i);
        two = check;
        alert(check);
      } else {
        flag = true;
      }
    }
    return two;
  }

  function input(i) { // re input
    var user = prompt(i + "번째 프레임의 점수를 재 입력하세요", "0");
    user = errorcheck(user, i);
    return user;
  }
  
  function  checking(one,two,three,rest,nextone,nexttwo,i){
    if (two == rest) { // 스페어 처리부분
      flag = 0;
      alert("스페어");
      spareflag = true;
    } else if (one == 0 && two == 0) {
      flag = 0;
      result += Number(one) + Number(two);
      totalSum(i);
//      drowone(one);
//      drowtwo(two,rest);
      alert("one two open" + result);
    } else if (one == 0) { // One 오픈 처리
      result += Number(one) + Number(two); 
      flag = 0;
      alert("one open" + result);
      totalSum(i);
//      drowone();
    } else if (two == 0) { // Two 오픈 처리
      result += Number(one) + Number(two); 
      flag = 0;
      alert("two open " + result);
      totalSum(i);
//      drowtwo();
    } else if(flag == 1){
    /*  nextone = one; //다음값 첫번째 
      nexttwo = two; //다음값 두번째 
*/          strike(nextone,nexttwo,i);
    } else if(flag == 2){
//      alert("sp1 = " + sp1);
//      alert("sp2 = " + sp2); 
//      alert("double check  nextone<-one = " + one); //10
//      alert("double check  nexttwo<-two = " + two); // undefined;
      nextone = one;
      nexttwo = two;
      double(nextone,nexttwo,i);
    } else if(flag >= 3){
      nextone = one;
      nexttwo = two;
      truky(nextone,nexttwo,i);
    }
    else { // 일반 계산 처리
      flag = 0;
      result += Number(one) + Number(two); 
/*        drowone(one);
      drowtwo(two);
*/        
      totalSum(i);
      alert("ADD result = "+ result);
    }
  }

  function user() {
    var one=0;
    var two=0;
    var three=0;
    var i = 0; // 프레임
    var nextone = 0; // 다음 프레임 1구값
    var nexttwo = 0; // 다음 프레임 2구값

    var state = true; // 첫번째만 입력 받아야할 경우 T , 첫번째와 두번째 입력 받아야할 경우 F

    while (i != 10) { // 10회째 탈출함
      i++;
      var rest = 0; // 첫번째 값 나머지 가지고 있을꺼임
      one = prompt(i + "번째 프레임의 1번째 구 점수를 입력하세요", "0");
      one = errorcheck(one);
      one = undefinedcheck(one, i);
      rest = 10 - Number(one);
      state = onelogicCheck(state, one);
      htmlTableOne(one,i);

      if (spareflag == true) { // 스페어 상태처리 부분
        nextone = one;
        spare(nextone,i);
        nextone = 0;
        spareflag = false;
      }
      
      if (state) { // T 첫번째만 입력받음
        flag +=1;
      } else { // 그외에는 두번째만 입력받음
        two = prompt(i + "번째 프레임의 2번째 구 점수를 입력하세요", "0");
        two = errorcheck(two);
        two = undefinedcheck(two, i);
        two = restcheck(rest, two, i); // 남아있는 공보다 크게 나올수 없게 함 , 입력한 값이 공수 같거나 적으면 재입력된 값을 two로 반환
        htmlTableTwo(two , rest,i);
        sp1 = one;
        sp2 = two;
        }
        checking(one,two,three,rest,nextone,nexttwo,i);
     
        if(i == 10 && spareflag == true || flag > 1){
          three =  prompt(i + "번째 프레임의 3번째 구 점수를 입력하세요", "0");
          three = errorcheck(three);
          three = undefinedcheck(three, i);
          
         checking(one,two,three,rest,nextone,nexttwo,i);
        }
    }
  }
}
