let idConfirmChk = false;

const userId = document.querySelector("#userId"),
    psword = document.querySelector("#psword"),
    loginBtn = document.querySelector("#loginBtn");

const joinUserId = document.querySelector("#joinUserId"),
    idDoubleChkBtn = document.querySelector("#idDoubleChkBtn"),
    joinPsword = document.querySelector("#joinPsword"),
    joinPswordRe = document.querySelector("#joinPswordRe"),
    joinUserName = document.querySelector("#joinUserName"),
    joinBtn = document.querySelector("#joinBtn"),
    joinFrm = document.querySelector("#joinFrm");



idDoubleChkBtn.addEventListener("click", doubleChk);    
joinUserId.addEventListener("keyup", idConfirmChkFalse);
joinBtn.addEventListener("click", joinSubmit)
loginBtn.addEventListener("click", loginProc);


function loginProc(){
    if(userId.value === "" || userId.value === undefined){
        alert('아이디를 입력해 주세요');
        return;
    }else if(psword.value === "" || psword.value === undefined){
        alert('비밀번호를 입력해 주세요')
        return;
    }else{    
        const data = {
            userId : userId.value,
            psword : psword.value
        }
        fetch("/user/loginProc",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((res) =>{
            if(res.success){
                if(res.state === 0){
                    alert('아이디 또는 비밀번호를 확인해 주세요');
                }else{
                    location.href = "/";
                }
            }else{
                alert('로그인 할 수 없습니다.')
                return
            }
        })


    }
}



function doubleChk(){
    if(idRegularExpression(joinUserId.value)){
        alert('아이디는 영어 + 숫자 6글자이상 입력해주세요')
        return;
    }else{
        const data = {
            userId : joinUserId.value
        }
        fetch("/user/userIdDubleChk", {
            method : "POST",            
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((res) => {        
            if(res.doubleChk){                                
                idConfirmChk = true;                
                alert("사용할수 있는 아이디 입니다.");
                idDoubleChkBtn.style.display = "none";                
                return;
            }else{
                alert("이미 존재하는 아이디 입니다.");
                idDoubleChkBtn.style.display = "block";                
                return;
            }
        })
        .catch((err)=>{
            
        })
    }

}    

function idConfirmChkFalse(){    
    idConfirmChk = false;
    idDoubleChkBtn.style.display = "block";
}



function joinSubmit(){
    if(!idConfirmChk){
        alert('아이디 중복확인을 해주세요')
    }else if(passwordRegularExpression(joinPsword.value)){
        alert('비밀번호는는 영어 + 숫자 6글자이상 입력해주세요')
    }else if(joinPsword.value != joinPswordRe.value){
        alert('비밀번호를 확인해 주세요')
    }else if(nameRegularExpression(joinUserName.value)){
        alert('한글 2-5글자 이름을 입력해주세요')
    }else{
        const data = {
            userId : joinUserId.value,
            password : joinPsword.value,
            name : joinUserName.value,
        }

        fetch("/user/joinProc",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((res) => {
            if(res.success){
                alert("가입 되셨습니다.")
                location.href = "/";
            }else{
                alert("가입에 실패했습니다.")
            }            
        })
        .catch((err) => {
            console.log(err);
        })
    }
}
	

//아이디 정규식
function idRegularExpression(username){
	var regType1 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/;
	if(regType1.test(username)){
		return false;
	}else{
		return true
	}
}

//비밀번호 정규식
function passwordRegularExpression(password){
	var regType1 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/;
	if(regType1.test(password)){
		return false;
	}else{
		return true
	}
}

//한글 정규식(이름)
function nameRegularExpression(name){
	var regType1 = /^[가-힣]{2,5}$/;
	if(regType1.test(name)){
		return false;
	}else{
		return true
	}
}

