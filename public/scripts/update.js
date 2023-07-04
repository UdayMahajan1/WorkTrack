function test() {
  let val = document.getElementById("pass-check").checked;
  if (val) {
    document.getElementById("pass-box").style.display = "block";
  } else {
    document.getElementById("pass-box").style.display = "none";
  }
}

function update(e)
{
  let val = e.substring(1);
  let desc =  document.getElementById(`desc${val}`).innerText;
  let type = document.getElementById(`type${val}`).innerText;
  let st_time = document.getElementById(`st_time${val}`).innerText;
  let time = document.getElementById(`time${val}`).innerText;
  document.getElementById(`udesc${val}`).value = desc;
  document.getElementById(`prevSt_time${val}`).value = st_time;
  document.getElementById(`utype${val}`).value = type;
  document.getElementById(`ust_time${val}`).value = st_time;
  document.getElementById(`utime_taken${val}`).value = time;
}

function remove(e)
{
  let val = e[1];
  let desc = document.getElementById(`desc${val}`).innerText;
  let type = document.getElementById(`type${val}`).innerText;
  let st_time = document.getElementById(`st_time${val}`).innerText;
  let time = document.getElementById(`time${val}`).innerText;

  document.getElementById("ddesc").value = desc;
  document.getElementById("dtype").value = type;
  document.getElementById("dst_time").value = st_time;
  document.getElementById("dtime").value = time;

  document.getElementById("deleteForm").submit();
}

function edit(e) {
  // console.log(e)
  let prevDesc =  document.getElementById(`prevDesc-${e}`).innerText;
  let prevType = document.getElementById(`prevType-${e}`).innerText;
  let prevSt_time = document.getElementById(`prevSt_time-${e}`).innerText;
  let prevTime = document.getElementById(`prevTime-${e}`).innerText;
  let prevDate = document.getElementById(`prevDate-${e}`).innerText;
  document.getElementById(`modalVisiblePrevDesc-${e}`).value = prevDesc;
  document.getElementById(`modalOldPrevSt_time-${e}`).value = prevSt_time;
  document.getElementById(`modalPrevType-${e}`).value = prevType;
  document.getElementById(`modalPrevTime-${e}`).value = prevTime;
  document.getElementById(`modalNewPrevSt_time-${e}`).value = prevSt_time;
  document.getElementById(`modalPrevDate-${e}`).value = prevDate;

  console.log(prevDate)
}

function del(e) {
  let prevDesc =  document.getElementById(`prevDesc-${e}`).innerText;
  let prevType = document.getElementById(`prevType-${e}`).innerText;
  let prevSt_time = document.getElementById(`prevSt_time-${e}`).innerText;
  let prevTime = document.getElementById(`prevTime-${e}`).innerText;
  let prevDate = document.getElementById(`prevDate-${e}`).innerText;

  document.getElementById("pddesc").value = prevDesc;
  document.getElementById("pdtype").value = prevType;
  document.getElementById("pdst_time").value = prevSt_time;
  document.getElementById("pdtime").value = prevTime;
  document.getElementById("pddate").value = prevDate;

  document.getElementById("deletePrevData").submit();
}