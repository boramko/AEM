<!-- this is game test bowling socre Game .. -->
function init() {
  var count = 0;
  var result = 0; // 총값
  var spareflag = false;
  var sp1 = 0; // 이전값 one
  var sp2 = 0; // 이전값 two

  start();

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

  function undefinedcheck(number, i) {
    while (number == undefined) {
      number = input(i); // re input error
    }
    return number;
  }

  function user() {
    var i = 0;
    var one = 0;
    var two = 0;
    var three = 0;
    var nextone = 0; // 다음 프레임 1구값
    var nexttwo = 0; // 다음 프레임 2구값

    while (i != 10) {

      i++;
      var rest = 0; // 첫번째 값 나머지 가지고 있을꺼임
      one = prompt(i + "번째 프레임의 1번째 구 점수를 입력하세요", "0");
      one = errorcheck(one);
      one = undefinedcheck(one, i);

      if (spareflag == true) { //플래그가 참일경우 스페어 계산
        sparecheck(nextone, spareflag, i, one);
      }

      htmlTableOne(one, i); //첫번째 입력된 값 그려줌

      if (one != 10) { // 첫번째가 10이 아니라면 남은 값 구해줌
        rest = 10 - Number(one);
      }

      if (one == 10) { // 스트라이크라면 카운트 증가후 sp1에 저장(이전값이됨)
        sp1 = one;
        count += 1;
        if (count == 2) { // 카운터가 2라면 one 값을 다음값에 지정 
          nextone = one;
        }
      }

      if (one == 10 && count == 3) { // 3번 스트라이크시 x1에 결과 뿌려주는역활 
        result += Number(one) + Number(sp1) + Number(nextone);
        totalSum(i - 2);
        count -= 1;
      }

      if (one != 10) { //첫번째가 10이 아니라면 2번째 입력!

        two = prompt(i + "번째 프레임의 2번째 구 점수를 입력하세요", "0");
        two = errorcheck(two);
        two = undefinedcheck(two, i);
        two = restcheck(rest, two, i); // 남아있는 공보다 크게 나올수 없게 함 , 입력한 값이 공수 같거나
        htmlTableTwo(two, i);

        if (count >= 1) {
          strikecheck(count, one, two, nextone, i); // 스트라이크 체크
          count = 0;
        }
        checking(one, two, three, rest, nextone, nexttwo, i); // 일반 계산 처리등
      }
    }

    if (i == 10 && one == 10 || count == 2) {
      two = prompt(i + "번째 프레임의 2번째 구 점수를 입력하세요", "0");
      two = errorcheck(two);
      two = undefinedcheck(two, i);
      htmlTableTwo(two, i);

      if (i == 10 && count == 2) { //9라운드 계산해주기
        result += Number(one) + Number(sp1) + Number(two);
        totalSum(i - 1);
      }

      result += Number(one) + Number(two);
      totalSum(i);
    }

    if (i == 10 && one == 10 || two == 10 || rest == two) {// 10라운드 이면서 첫번째가
      three = prompt(i + "번째 프레임의 3번째 구 점수를 입력하세요", "0");
      three = errorcheck(three);
      three = undefinedcheck(three, i);
      var rest1 = 0;

      if (two != 10) { // 첫번째가 10이 이라면 두번째 값과 세번째 값 비교
        rest1 = 10 - Number(two);
        three = restcheck(rest1, three, i);
      }

      var a = i;
      a += 11;
      var tr1 = document.getElementById("data" + a);
      tr1.innerHTML = "<td>" + three + "</td>";

      var first = one;
      var seceond = two;

      if (first == 10 && seceond == 10 && three == 10) {
        result += Number(three);
        totalSum(i);
      } else if (rest1 == two) {
        result += Number(first) + Number(seceond) + Number(three);
        totalSum(i);
      } else {
        result += Number(three);
        totalSum(i);
      }
    }
  }

  //컴퓨터 

  function com() {
    var flag = false;
    var i = 0;
    var one = 0;
    var two = 0;
    var three = 0;
    var nextone = 0; // 다음 프레임 1구값
    var nexttwo = 0; // 다음 프레임 2구값

    while (i != 10) {
      i++;
      var rest = 0; // 첫번째 값 나머지 가지고 있을꺼임
      one = Math.floor(Math.random() * 11);

      if (spareflag == true) {
        sparecheck(nextone, spareflag, i, one);
      }

      htmlTableOne(one, i);

      if (one != 10) {
        rest = 10 - Number(one);
      }

      if (one == 10) {
        count += 1;
        sp1 = one;
        if (count == 2) {
          nextone = one;
        }
      }

      if (one == 10 && count == 3) { // 첫번째 입력이 10이면서 카운트가 10이면 터키 계산
        result += Number(one) + Number(sp1) + Number(nextone);
        totalSum(i - 2);
        count -= 1;
      }

      if (one != 10) {
        var flag = false;
        two = Math.floor(Math.random() * 11);
        while (flag == false) {
          if (two > rest) {
            two = Math.floor(Math.random() * 11);
          } else {
            flag = true;
          }
        }
        htmlTableTwo(two, i);
      
        if (i == 10 && count == 2) { //9라운드 계산해주기
          result += Number(one) + Number(sp1) + Number(two);
          totalSum(i - 1);
        }
        
        if (count >= 1) {
          strikecheck(count, one, two, nextone, i); // 스트라이크 체크
          count = 0;
        } 
        checking(one, two, three, rest, nextone, nexttwo, i); // 일반 계산 처리등
      }
    }
    if (i == 10 && one == 10) {
      two = Math.floor(Math.random() * 11);
      htmlTableTwo(two, i);

      result += Number(one) + Number(two);
      totalSum(i);
    }
    if (i == 10 && one == 10 || two == 10 || rest == two) {// 10라운드 이면서 첫번째가
      flag = false;
      three = Math.floor(Math.random() * 11);
      var rest1 = 0;

      if (two != 10) { // 첫번째가 10이 이라면 두번째 값과 세번째 값 비교
        while (flag == false) {
          if (three > rest1) {
            three = Math.floor(Math.random() * 11);
          } else {
            flag = true;
          }
        }
      }

      var a = i;
      a += 11;
      var tr1 = document.getElementById("data" + a);
      tr1.innerHTML = "<td>" + three + "</td>";

      var first = one;
      var seceond = two;

      if (first == 10 && seceond == 10 && three == 10) {
        result += Number(three);
        totalSum(i);
      } else if (rest == two) {
        result += Number(first) + Number(seceond) + Number(three);
        totalSum(i);
      } else {
        result += Number(three);
        totalSum(i);
      }
    }
  }

  // function 

  function htmlTableOne(one, i) {
    var a = i;
    a -= 1;
    var tr1 = document.getElementById("data" + a);
    tr1.innerHTML = "<td>" + one + "</td>";
  }
  function htmlTableTwo(two, i) {
    var a = i;
    a += 10;
    var tr1 = document.getElementById("data" + a);
    tr1.innerHTML = "<td>" + two + "</td>";
  }
  function totalSum(i) {
    var td = document.getElementById("result" + i);
    td.innerHTML = result;
  }
  function input(i) { // re input
    var user = prompt(i + "번째 프레임의 점수를 재 입력하세요", "0");
    user = errorcheck(user, i);
    return user;
  }
  function sparecheck(nextone, spareflag, i, one) {
    if (spareflag == true) { // 스페어 상태처리 부분
      nextone = one;
      spare(nextone, i);
      nextone = 0;
      spareflag = false;
    }
    spareflag = false;
  }
  function strikecheck(count, one, two, nextone, i) {
    if (count == 1) {
      result += Number(sp1) + Number(one) + Number(two);
      totalSum(i - 1);
      count = 0;
    } else if (count == 2) {
      result += Number(sp1) + Number(one) + Number(nextone);
      totalSum(i - 2);
      result += Number(sp1) + Number(one) + Number(two);
      totalSum(i - 1);
      count = 0;
    } else if (count == 3) {
      result += 30; // Number(one) + Number(two); //result += 10;/*Number(sp1)*/
      totalSum(i - 3);
      result += Number(one) + Number(nextone) + Number(sp1); // + Number(one);
      totalSum(i - 1);
      result += Number(sp1) + Number(one) + Number(two); // result +=
      totalSum(i);
      count = 0;
    }
  }
  function checking(one, two, three, rest, nextone, nexttwo, i) {

    if (two == rest) { // 스페어 처리부분
      count = 0;
      sp1 = one;
      sp2 = two;
      spareflag = true;
    } else if (one == 0 && two == 0) {
      count = 0;
      result += Number(one) + Number(two);
      totalSum(i);
    } else if (one == 0) { // One 오픈 처리
      result += Number(one) + Number(two);
      count = 0;
      totalSum(i);
    } else if (two == 0) { // Two 오픈 처리
      result += Number(one) + Number(two);
      count = 0;
      totalSum(i);
    } else if (count == 0) { // 일반 계산 처리
      result += Number(one) + Number(two);
      totalSum(i);
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
  function restcheck(rest, two, i) { // rest ball check
    var flag = false;
    var check;
    while (flag == false) {
      if (two > rest) {
        alert("공 보다 많습니다. 남은공 : " + rest);
        check = input(i);
        two = check;
      } else {
        flag = true;
      }
    }
    return two;
  }
  function spare(nextone, i) { // 다음1구값
    result += Number(sp1) + Number(sp2) + Number(nextone);
    totalSum(i - 1);
    spareflag = false;
  }

  function onelogicCheck(state, one) { // one만 입력받을지 체크
    if (one == 10) { // 스트라이크 = 1한번만 받음
      state = true;
    } else { // 그외에는 2번씩 다 입력 받겠다.
      state = false;
    }
    return state;
  }

  function undefinedcheck(number, i) {
    while (number == undefined) {
      number = input(i); // re input error
    }
    return number;
  }

}

function reset() {
  location.reload();
}


