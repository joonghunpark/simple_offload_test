const url = "ws://10.113.165.164:8080";
const connection = new WebSocket(url);

var flag = false;

function sleep(ms) {
  const date = Date.now();
  let currentDate = null;
  do {
    if (flag)
          return;
    currentDate = Date.now();
  } while (currentDate - date < ms);
}

function asyncTest(stime) {
   setTimeout(() => { console.log("set flag to true."); flag = true }, 1000);
        console.log("sleep 5");
   do {
	sleep(100);
   } while (flag == false)
}


connection.onerror = error => {
  console.log(`WebSocket error: ${error}`)
}

function addTest(a, b) {
return a + b;
}

function remoteExecution(target_func, statement_to_remote_exec) {
var func_str = target_func.toString();

connection.send(func_str + ";" + "return " + statement_to_remote_exec);
}

connection.onopen = () => {
  remoteExecution(addTest, "addTest(1,2)");
  asyncTest(5000);

console.log("print");
}

connection.onmessage = e => {
  flag = true;
  console.log(e.data)
}
